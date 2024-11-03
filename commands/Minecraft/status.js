const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Embed,
  Colors,
  ActionRowBuilder,
  AttachmentBuilder,
} = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Your minecraft server status.")
    .addStringOption((option) =>
      option
        .setName('type')
        .setDescription('Choose between java/bedrock')
        .addChoices(
          { name: "java", value: "java" },
          { name: "Bedrock", value: "bedrock" }
        )
        .setRequired(true)
    )
    .addStringOption((op) =>
      op
        .setName("ip")
        .setDescription("Provide the server Ip")
        .setRequired(true)
    )
    .addIntegerOption((op) =>
      op
        .setName("port")
        .setDescription("Provide the server port")
        .setRequired(false)
    ),

  async execute(interaction, client) {

    let ip = interaction.options.getString("ip");
    let port = interaction.options.getInteger("port");

    if (interaction.options.getString("type") === "java") {
      serverURL = `https://api.mcsrvstat.us/2/${ip}`;
    } else if (interaction.options.getString("type") === "bedrock") {
      serverURL = `https://api.mcsrvstat.us/bedrock/2/${ip}:${port}`;
    }

    try {
      await fetch(serverURL)
        .then((res) => res.json())
        .then((data) => {
          let status = "❌ | Offline";
          let motd2 = "❌ | Disabled";
          let motd = `A Minecraft Server`;
          let players = "Currnetly players are hidden!";
          let onlineplayers = 0;
          let maxplayers = 0;

          if (data.online === true) {
            status = "✅ | Online";

            if (data.motd.clean) {
              motd = data.motd.clean;
            }

            if (data.players.online !== 0) {
              onlineplayers = data.players.online;
            }
            if (data.animatedmotd !== true) {
              motd2 = "✅ | Enabled";
            }

            if (data.players.max !== 0) {
              maxplayers = data.players.max;
            }
            if (data.players.list !== undefined) {
              if (data.players.list === null) {
                players = "No one playing!";
              } else if (data.players.list !== null) {
                if (data.players.list > 10) {
                  players =
                    "More than 10+ Members are playing! I can't list them.";
                } else if (data.players.list < 10) {
                  players = data.players.list.join(" , ");
                }
              }
            }
          }

          const embedStatus = new EmbedBuilder()
            .setTitle("Minecraft Server Status")
            .addFields([
              {
                name: "**`•`** Server Address",
                value: `**\`${ip}\`**`,
                inline: true,
              },
              {
                name: "**`•`** Port",
                value: `**\`${port || "N/A"}\`**`,
                inline: true,
              },
              {
                name: "**`•`** Status",
                value: `\`\`\`${status}\`\`\``,
                inline: true,
              },
              {
                name: "**`•`** Animated Motd",
                value: `\`\`\`${motd2}\`\`\``,
                inline: true,
              },
              {
                name: "**`•`** Player Count",
                value: `\`\`\`${data.players.online} | ${data.players.max} Players\`\`\``,
                inline: true,
              },
              {
                name: "**`•`** Version",
                value: `\`\`\`${data.version}\`\`\``,
                inline: true,
              },
              {
                name: "**`•`** Motd",
                value: `\`\`\`${motd}\`\`\``,
                inline: false,
              },
              {
                name: "**`•`** Players",
                value: `\`\`\`${players}\`\`\``,
                inline: false,
              },
            ])
            .setThumbnail(`https://api.mcsrvstat.us/icon/${ip}`)
            .setColor("#2F3136")
            .setFooter({ text: "Fabrica Developer - zynox.c" })
            .setTimestamp();

          interaction.reply({ embeds: [embedStatus] });
        });
    } catch (error) {
      console.log(error);
      const err_embed = new EmbedBuilder()
        .setTitle("Error")
        .addFields({
          name: "The issues can be,",
          value: `**\`•\`** \`Your IP/PORT is wrong\`.
      **\`•\`** \`Your minecraft server is offline\`.
      **\`•\`** \`Your Minecraft server query is false\`.`,
        })
        .setColor("#2F3136")
        .setFooter({ text: "Fabrica Developer - zynox.c" })
        .setTimestamp();

      interaction.reply({ embeds: [err_embed], ephemeral: true });
    }

  }
}