<p align="center">
    <img src="./src/assets/icon.png" width="150">
</p>

<h1 align="center">ChatHub</h1>

<div align="center">

### ChatHub is an all-in-one chatbot client

[![author][author-image]][author-url]
[![license][license-image]][license-url]
[![release][release-image]][release-url]
[![last commit][last-commit-image]][last-commit-url]

English &nbsp;&nbsp;|&nbsp;&nbsp; [Indonesia](README_IN.md) &nbsp;&nbsp;|&nbsp;&nbsp; [简体中文](README_ZH-CN.md) &nbsp;&nbsp;|&nbsp;&nbsp; [繁體中文](README_ZH-TW.md) &nbsp;&nbsp;|&nbsp;&nbsp; [日本語](README_JA.md)

##

### Install

<a href="https://chrome.google.com/webstore/detail/chathub-all-in-one-chatbo/iaakpnchhognanibcahlpcplchdfmgma?utm_source=website"><img src="https://user-images.githubusercontent.com/585534/107280622-91a8ea80-6a26-11eb-8d07-77c548b28665.png" alt="Get ChatHub for Chromium"></a>
<a href="https://microsoftedge.microsoft.com/addons/detail/chathub-allinone-chat/kdlmggoacmfoombiokflpeompajfljga"><img src="https://user-images.githubusercontent.com/585534/107280673-a5ece780-6a26-11eb-9cc7-9fa9f9f81180.png" alt="Get ChatHub for Microsoft Edge"></a>

##

[Screenshot](#-Screenshot) &nbsp;&nbsp;|&nbsp;&nbsp; [Features](#-Features) &nbsp;&nbsp;|&nbsp;&nbsp; [Manual Installation](#-manual-installation) &nbsp;&nbsp;|&nbsp;&nbsp; [Roadmap](#%EF%B8%8F-roadmap) &nbsp;&nbsp;|&nbsp;&nbsp; [Changelog](#-Changelog)

[author-image]: https://img.shields.io/badge/author-wong2-blue.svg
[author-url]: https://github.com/wong2
[license-image]: https://img.shields.io/github/license/chathub-dev/chathub?color=blue
[license-url]: https://github.com/chathub-dev/chathub/blob/main/LICENSE
[release-image]: https://img.shields.io/github/v/release/chathub-dev/chathub?color=blue
[release-url]: https://github.com/chathub-dev/chathub/releases/latest
[last-commit-image]: https://img.shields.io/github/last-commit/chathub-dev/chathub?label=last%20commit
[last-commit-url]: https://github.com/chathub-dev/chathub/commits

</div>

##

## 📷 Screenshot

![Screenshot](screenshots/extension.png?raw=true)

![Screenshot (Dark Mode)](screenshots/dark.png?raw=true)

## ✨ Features

- 🤖 Use different chatbots in one app, currently supporting ChatGPT, new Bing Chat, Google Bard and Claude (via Poe), will integrate more in the future
- 💬 Chat with multiple chatbots at the same time, making it easy to compare their answers
- 🚀 Support ChatGPT API mode, which is faster and more cost-effective than ChatGPT Plus
- 📊 Token usage stats when using ChatGPT API mode
- 🔍 Shortcut to quickly activate the app anywhere in the browser
- 🎨 Markdown and code highlight support
- 📚 Prompt Library for custom prompts and community prompts
- 💾 Conversation history saved locally
- 📥 Export and Import all your data
- 🔗 Share conversation to markdown
- 🌙 Dark mode

## 🔧 Manual Installation

- Download chathub.zip from [Releases](https://github.com/chathub-dev/chathub/releases)
- Unzip the file
- In Chrome/Edge go to the extensions page (chrome://extensions or edge://extensions)
- Enable Developer Mode
- Drag the unzipped folder anywhere on the page to import it (do not delete the folder afterward)

## 🔨 Build from source

- Clone the source code
- `yarn install`
- `yarn build`
- Load `dist` folder to browser by following steps in _Manual Installation_

## 🗺️ Roadmap

- [x] Conversation history
- [x] Share conversation to markdown
- [x] Dark mode

## 📜 Changelog

### v1.11.0

- Support Claude (via Poe)

### v1.10.0

- Command + K

### v1.9.4

- Dark mode

### v1.9.3

- Support math formula with katex
- Save community prompt to local

### v1.9.2

- Delete history messages

### v1.9.0

- Share chat as markdown or via sharegpt.com

### v1.8.0

- Import/Export all data
- Edit local prompts
- Switch chatbots for comparison

### v1.7.0

- Add conversation history

### v1.6.0

- Add support for Google Bard

### v1.5.4

- Support GPT-4 model in ChatGPT api mode

### v1.5.1

- Add i18n settings

### v1.5.0

- Support GPT-4 model in ChatGPT Webapp mode

### v1.4.0

- Add Prompt Library

### v1.3.0

- Add copy code button
- Sync chat state between all-in-one and standalone mode
- Allows input while generating answer

### v1.2.0

- Support copy message text
- Improve setting page form element style
