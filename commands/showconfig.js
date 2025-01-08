const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../data/config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showconfig")
    .setDescription("Shows the current configuration"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Bot Configuration")
      .setColor(config.Config.color);

    // Read values from the JSON and insert them into the embed
    for (const [key, value] of Object.entries(config.Config)) {
      embed.addFields({ name: key, value: value.toString(), inline: true });
    }

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
