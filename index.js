const { Client, GatewayIntentBits, CommandInteraction } = require('discord.js');
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

// Register the /key command
client.on('ready', async () => {
  try {
    await client.application?.commands.set([
      {
        name: 'key',
        description: 'Retrieve information about Mann Co. Supply Crate Keys.',
      },
    ]);
    await client.application?.commands.set([
      {
        name: 'alert',
        description: 'Set up an alert for low-priced items.',
        options: [
          {
            name: 'price',
            description: 'The maximum price for alerting.',
            type: 10,
            required: true,
          },
        ],
      },
    ]);
    
    console.log('Command /key and /alert are registered.');
  } catch (error) {
    console.error('Error registering commands:', error.message);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction; // Destructure the options here

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
  } else if (commandName === 'alert') {

    // Handle the /alert command with a parameter
    const alertPrice = options.getNumber('price');
    if (alertPrice !== null) {

      console.log(alertPrice);
      interaction.reply(`The alert price has been set to $${alertPrice.toFixed(2)}`);
      // You can now use the alertPrice parameter in your alert logic
      // For example: if (item.price <= alertPrice) { // Send an alert }
    } else {
      // Handle the case when the user didn't provide a valid price
      interaction.reply('Please provide a valid maximum price for the alert.');
    }
  }
});

client.login(discordBotToken);
