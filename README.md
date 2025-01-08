# Discord GitHub Bot

Discord bot to monitor GitHub logs and facilitate various server management tasks.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Commands](#commands)
- [Events](#events)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Monitor GitHub logs
- Manage roles, channels, and webhooks
- Send logs and error messages to a specified channel
- Provide support information
- Slash commands for easy interaction

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/discord-github-bot.git
    cd discord-github-bot
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your Discord bot token and other configuration:
    ```env
    DISCORD_TOKEN=your_discord_token
    NODE_ENV=production
    DISCORD_CLIENT_ID=your_client_id
    DISCORD_DEV_SERVER_ID=your_dev_server_id
    ```

## Configuration

Edit the `data/config.json` file to configure the bot settings:
```json
{
  "Config": {
    "discord_log": "your_log_channel_id",
    "color": "#ffecea"
  }
}