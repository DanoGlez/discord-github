// Command to show the owner and support information
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("support")
    .setDescription("Shows support information"),

  async execute(interaction) {
    // Embed with support information
    const embed = new EmbedBuilder()
      .setTitle("Support")
      .setColor(0xffecea)
      .setDescription(
        "This bot has been made to facilitate the work for developers. It is a project for me, so it is open source and you can access it. This is a simple connection to create a channel, create a role, and manage webhooks. All rights are reserved to the creator. Any problem or doubt you can ask the creator (@danoglez)."
      )
      .setFooter({
        text: "Vapid Motors",
        iconURL:
          "https://media.discordapp.net/attachments/1306024401963319399/1306024456296333392/Diseno_sin_titulo__5_-removebg-preview_1.png?ex=675c0dcf&is=675abc4f&hm=24b70a104b318527cd855e7c7990a1f1dd51a949e9a183ecf1165d5f658c2ba0&=&format=webp&quality=lossless&width=562&height=562",
      });
    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
