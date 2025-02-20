import WebSocketAsPromised from 'websocket-as-promised'
import { requestHostPermission } from '~app/utils/permissions'
import { AbstractBot, SendMessageParams } from '../abstract-bot'
import { GRAPHQL_QUERIES, PoeSettings, getChatId, getPoeSettings, gqlRequest } from './api'
import { ChatError, ErrorCode } from '~utils/errors'

const BOT_ID = 'a2' // Claude-instant

interface ChatMessage {
  id: string
  author: string
  text: string
  state: 'complete' | 'incomplete'
  messageId: number
}

interface WebsocketMessage {
  message_type: 'subscriptionUpdate'
  payload: {
    subscription_name: 'messageAdded'
    unique_id: string
    data: {
      messageAdded: ChatMessage
    }
  }
}

interface ConversationContext {
  poeSettings: PoeSettings
  chatId: number // user specific chat id for the bot
  wsp: WebSocketAsPromised
}

export class PoeWebBot extends AbstractBot {
  private conversationContext?: ConversationContext

  constructor() {
    super()
  }

  async doSendMessage(params: SendMessageParams) {
    if (!(await requestHostPermission('https://*.poe.com/'))) {
      throw new ChatError('Missing poe.com permission', ErrorCode.MISSING_POE_HOST_PERMISSION)
    }

    if (!this.conversationContext) {
      const { poeSettings, chatId } = await this.getChatInfo()
      const wsp = await this.connectWebsocket(poeSettings)
      await this.subscribe(poeSettings)
      this.conversationContext = { chatId, poeSettings, wsp }
    }

    const wsp = this.conversationContext.wsp

    const onUnpackedMessageListener = (data: any) => {
      console.debug('onUnpackedMessage', data)
      const messages: WebsocketMessage[] = data.messages.map((s: string) => JSON.parse(s))
      for (const m of messages) {
        if (m.message_type === 'subscriptionUpdate' && m.payload.subscription_name === 'messageAdded') {
          const chatMessage = m.payload.data.messageAdded
          console.log(chatMessage)
          params.onEvent({
            type: 'UPDATE_ANSWER',
            data: { text: chatMessage.text },
          })
          if (chatMessage.state === 'complete') {
            params.onEvent({ type: 'DONE' })
            wsp.onUnpackedMessage.removeAllListeners()
          }
        }
      }
    }

    wsp.onUnpackedMessage.addListener(onUnpackedMessageListener)

    await wsp.open()
    await this.sendMessageRequest(params.prompt)
  }

  resetConversation() {
    if (!this.conversationContext) {
      return
    }
    const wsp = this.conversationContext.wsp
    wsp.removeAllListeners()
    wsp.close()
    this.sendChatBreak()
    this.conversationContext = undefined
  }

  private async getChatInfo() {
    const poeSettings = await getPoeSettings()
    const chatId = await getChatId(BOT_ID, poeSettings)
    return { poeSettings, chatId }
  }

  private async sendMessageRequest(message: string) {
    const { poeSettings, chatId } = this.conversationContext!
    await gqlRequest(
      'SendMessageMutation',
      {
        bot: BOT_ID,
        chatId,
        query: message,
        source: null,
        withChatBreak: false,
      },
      poeSettings,
    )
  }

  private async sendChatBreak() {
    const { chatId, poeSettings } = this.conversationContext!
    await gqlRequest('AddMessageBreakMutation', { chatId }, poeSettings)
  }

  private async subscribe(poeSettings: PoeSettings) {
    await gqlRequest(
      'SubscriptionsMutation',
      {
        subscriptions: [
          {
            subscriptionName: 'messageAdded',
            query: GRAPHQL_QUERIES.MessageAddedSubscription,
          },
        ],
      },
      poeSettings,
    )
  }

  private async getWebsocketUrl(poeSettings: PoeSettings) {
    const domain = `tch${Math.floor(Math.random() * 1000000) + 1}`
    const channel = poeSettings.tchannelData
    return `wss://${domain}.tch.${channel.baseHost}/up/${channel.boxName}/updates?min_seq=${channel.minSeq}&channel=${channel.channel}&hash=${channel.channelHash}`
  }

  private async connectWebsocket(poeSettings: PoeSettings) {
    const wsUrl = await this.getWebsocketUrl(poeSettings)
    console.debug('ws url', wsUrl)

    const wsp = new WebSocketAsPromised(wsUrl, {
      packMessage: (data) => JSON.stringify(data),
      unpackMessage: (data) => JSON.parse(data as string),
    })

    return wsp
  }
}
