const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require('dotenv').config();
const fs = require("fs");
const chalk = require("chalk")
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('  SlashCommand  ', '  Status  ').setBorder('|', '═', '●', '●');

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandsArray } = client;

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandsArray.push(command.data.toJSON());

        table.addRow(command.data.name, '» 🔥 «');
        
      }
    }

    const clientId = process.env.CLIENT_ID;
    const rest = new REST({ version: `9` }).setToken(
      process.env.Token
    );

    try {
      console.log(chalk.red(`Refresing • application (/) commands`));
      console.log(table.toString());

      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandsArray,
      });

  console.log(chalk.yellow('Slash Commands • Loaded'))
    } catch (err) {
      console.log(err);
    }
  };
};