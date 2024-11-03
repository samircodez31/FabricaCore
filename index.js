const { Client, Collection, GatewayIntentBits, EmbedBuilder, Colors } = require("discord.js");
const chalk = require("chalk");
const fs = require("fs");
const express = require('express');
const app = express();
const process = require("node:process");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates
  ],
});
app.get('/', (req, res) => {
  res.send("Minecraft System Loaded")
});

app.listen(3001, () => {
  console.log(`Server started.`)
})

client.commands = new Collection();
client.buttons = new Collection();
client.commandsArray = [];

const functionFolders = fs.readdirSync("./functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.on("ready", () => {
  console.log("Minecraft is ready to help! [Noice]")
  const activities = [
    { name: `/status`, type: 2 },
    { name: `${client.users.cache.size} Members`, type: 3 },
    { name: `/ping`, type: 4 },
    { name: `/support`, type: 5 },
  ];
  const status = [
    'dnd',
    'idle'
  ];
  let i = 0;
  setInterval(() => {
    if (i >= activities.length) i = 0
    client.user.setActivity(activities[i])
    i++;
  }, 5000);

  let s = 0;
  setInterval(() => {
    if (s >= activities.length) s = 0
    client.user.setStatus(status[s])
    s++;
  }, 30000);
});

client.handleCommands();
client.handleEvents();
client.login(process.env.Token); // Provide your token in the secrets section