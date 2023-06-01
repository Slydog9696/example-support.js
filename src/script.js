const { Client, Events, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { token } = require('./config.json');
const path = require('node:path');
const fs = require('node:fs');

const serviceAccount = require('./firebase.json');
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

module.exports = { db };

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
client.commands = new Collection();

const eventsPath = path.join(__dirname, './event-handler');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

const commandsPathPlayerManagement = path.join(__dirname, './command-handler');
const commandFiles = fs.readdirSync(commandsPathPlayerManagement).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPathPlayerManagement, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.on('ready', (event) => {
  console.log(`${event.user.tag} is online.`);
  client.user.setActivity('/ commands', { type: ActivityType.Listening });
});

client.login(token);