const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

require('dotenv').config();

const discordBotToken = process.env.DISCORD_BOT_TOKEN;
const bitskinsApiKey = process.env.BITSKINS_API_KEY;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const auth_key = bitskinsApiKey;
const itemLimit = 10; // Number of items per message

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
// ... (previous code)

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'key') {
    console.log('Command detected: /key');
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString(); // Get the current date and time

      await interaction.reply(`Fetching item information. Please wait... (Requested at: ${formattedDate})`);

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
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const formattedPrice = (item.price / 1000).toFixed(2); // Convert cents to dollars and cents
          const itemDescription = `**Item ${i + 1}:**\nItem ID: [${item.id}](https://bitskins.com/item/tf2/${item.id}/mann-co.-supply-crate-key)\nItem Name: ${item.name}\nItem Price: $${formattedPrice}`;
          
          // Send each item as a separate message with a delay of 1 second between messages
          await new Promise(resolve => setTimeout(resolve, 1000));
          await interaction.channel.send(itemDescription);
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

client.login(discordBotToken);
