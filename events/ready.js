const { Events, EmbedBuilder } = require("discord.js");
const Config = require("../data/config.json");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    // Send startup message to the log channel from the JSON
    const logChannelId = Config.Config.discord_log;

    if (logChannelId && logChannelId !== "") {
      const channel = await client.channels.fetch(logChannelId).catch(() => null);

      // Send embed
      if (channel && process.env["NODE_ENV"] === "production") {
        const embed = new EmbedBuilder()
          .setTitle("Bot started")
          .setColor(config.Config.color)
          .setDescription("The bot has started successfully");
        channel.send({ embeds: [embed] });
      } else {
        console.log("Log channel not found or invalid.");
      }
    } else {
      console.log("Log channel ID is empty.");
    }
  },
};


