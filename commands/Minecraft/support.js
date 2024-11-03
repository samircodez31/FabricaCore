const { SlashCommandBuilder, EmbedBuilder, Embed, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("support")
    .setDescription("Get support while using Fabrica"),
  async execute(interaction, client) {

    const newMessage = new EmbedBuilder()
      .setColor("#db722c")
      .setTitle(`Fabrica - Support Servers`)
      .setFooter({ text: "©2022 - Current | Fabrica" })
      .setDescription("> **Thanks for using `Fabrica` while learning coding! Here is the support server and invite link.**")

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel(`Support Server`)
          .setStyle(ButtonStyle.Link)
          .setEmoji("<:KnownCustomer:1261609296177790996>")
          .setURL(`https://fabrica-support.darkeis.fun`),
        new ButtonBuilder()
          .setLabel(`Invite Fabrica`)
          .setStyle(ButtonStyle.Link)
          .setEmoji("<:codez_invite:1063709721313427537>")
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=1301744593599201392&permissions=59392&scope=bot`),
      )

    interaction.reply({ embeds: [newMessage], components: [row] });
  },
};