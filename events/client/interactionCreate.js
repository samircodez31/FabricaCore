const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
    
          
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);         

            if (!command) return;


               try {
                await command.execute(interaction, client); 
            } catch (err) {
                console.log(err);
                const embed = new EmbedBuilder()
                 .setTitle("Command Error")
                 .setDescription("> **Seems like, your using wrong commands or it is broken. If you belive it's broken then, please join our discord server. `/support`.**")
      .setColor("#2F3136")
      .setFooter({ text: "Manager | Development™" })
                await interaction.reply({ embeds: [embed], ephemeral: true })
            }
        }
        
        else if (interaction.isButton()) {
          const { buttons } = client;
          const { customId } = interaction;
          const button = buttons.get(customId);

          if(!button) return new Error(`> **There is no code for button.**`);

                 
	}
      
    }
}
