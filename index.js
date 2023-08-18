const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const auth_key = 'YOUR_BITSKIN_TOKEN_HERE';
const itemLimit = 20; // Number of items per message

client.once('ready', () => {
  console.log('Bot is ready');
  console.log('Bot is currently in these guilds:');
  client.guilds.cache.forEach((guild) => {
    console.log(`- ${guild.name} (ID: ${guild.id})`);
    console.log('Channels:');
    guild.channels.cache.forEach((channel) => {
      console.log(` - ${channel.name} (ID: ${channel.id})`);
    });
  });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'key') {
    console.log('Command detected: /key');
    try {
      const body = {
        "limit": itemLimit,
        "offset": 0,
        "order": [
          {
            "field": "price",
            "order": "ASC"
          }
        ],
        "where": {
          "skin_name": "Mann Co. Supply Crate Key",
          "price_from": 1000,
          "price_to": 5000
        }
      };

      const response = await axios.post("https://api.bitskins.com/market/search/440", body, {
        headers: {
          "content-type": "application/json",
          "x-apikey": auth_key,
        },
      });

      const items = response.data.list;

      if (items.length > 0) {
        let itemNumber = 1;
        let itemDescriptions = '';

        for (const item of items) {
          const formattedPrice = (item.price / 1000).toFixed(2); // Convert cents to dollars and cents
          itemDescriptions += `**Item ${itemNumber}:**\n`;
          itemDescriptions += `Item ID: ${item.id}\nItem Name: ${item.name}\nItem Price: $${formattedPrice}\n---\n`;
          itemNumber++;
        }

        if (itemDescriptions) {
          await interaction.reply(itemDescriptions);
        }
      } else {
        interaction.reply('No items found.');
      }
    } catch (error) {
      console.error('Error fetching data from API:', error.message);
      interaction.reply('An error occurred while fetching data from the API.');
    }
  }
});

client.login('YOUR_DISCORD_BOT_TOKEN_HERE');
