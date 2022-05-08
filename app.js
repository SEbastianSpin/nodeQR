
require('dotenv').config();
const axios = require('axios');
const { Client, Intents,MessageAttachment } = require('discord.js');
const fs = require('fs');
 const  token = process.env.TOKEN ;


// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
    else if (commandName === 'ily') {
		await interaction.reply(`Sebas Loves You For ever and ever `);
	}

    else if (commandName === 'qr') {
        getQR(interaction);
      
        
	}
});


async function getQR(interaction) {
    try {
        let url=`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${interaction.options._hoistedOptions[0].value}`;
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });
        
       response.data.pipe(fs.createWriteStream("qrResponse.png"));
        
       const file =  new MessageAttachment('./qrResponse.png');
        const exampleEmbed =  {
            title: 'your Qr',
            image: {
                url: 'attachment://qrResponse.png',
            },
        };
		await interaction.reply({ embeds: [exampleEmbed], files: [file] });
        fs.unlink('qrResponse.png', (err) => {
            if (err) {
                throw err;
            }
        
            console.log("deleted qr image");
        });
      
    } catch (error) {
      console.error(error);
    }
  }

 

// Login to Discord with your client's token
client.login(token);