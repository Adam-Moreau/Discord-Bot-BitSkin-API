# Mann Co. Supply Crate Key Bot

A Discord bot that retrieves information about Mann Co. Supply Crate Keys from the Team Fortress 2 marketplace using the BitSkins API.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

## Introduction

The Mann Co. Supply Crate Key Bot is a Discord bot designed to provide information about Mann Co. Supply Crate Keys available in the Team Fortress 2 marketplace. It interacts with the BitSkins API to fetch data and displays details such as item ID, name, and price.

## Features

- Fetches and displays details about Mann Co. Supply Crate Keys.
- Displays item ID, name, and price in USD.

## Getting Started

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (v18.16.0 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)

If you don't have Node.js and npm installed, you can download and install them from the official Node.js website: [https://nodejs.org/](https://nodejs.org/)

### Installation

1. Clone the repository:
```shell
git clone https://github.com/your-username/your-project.git
```

2. Navigate to the project directory:
```shell
cd your-project
```

3. Install dependencies:
```shell
npm install
```

4. Install discord.js:
```shell
npm install discord.js
```
5. Install dotenv:
```shell
npm install dotenv
```

## Setting up API Tokens

To run the bot successfully, you'll need to set up your own API token for interacting with the Discord API. Additionally, if your bot requires any external APIs (such as the BitSkins API in this case), you'll need those tokens as well. Here's how you can do it:

### Discord Bot Token

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click on "New Application" and give your application a name.
3. In the left sidebar, click on "Bot" and then click on "Add Bot."
4. Under the "Token" section, click "Copy" to copy your bot token.
5. In the root folder of your project, create a file named `.env`.
6. In the `.env` file, add the following line and paste your bot token:

```shell 
  DISCORD_BOT_TOKEN=your-bot-token 
```
Replace `your-bot-token` with the actual token you copied.

**Note**: Keep your bot token private and never share it publicly.

### External API Tokens

If your bot interacts with external APIs like BitSkins, follow these steps:

1. Sign up for the API service you're using and obtain an API key.
2. Add your API key to the `.env` file in the root folder of your project in the same manner as the bot token. For example, if you're using BitSkins:

```shell
  BITSKINS_API_KEY=your-bitskins-api-key
```

Replace `your-bitskins-api-key` with your actual BitSkins API key.

## Usage

After setting up your tokens, your bot will be able to communicate with the Discord API and any external APIs you're using securely.

To use the bot, invite it to your Discord server and interact with it using the /key command. The bot will respond with information about Mann Co. Supply Crate Keys available in the marketplace.

