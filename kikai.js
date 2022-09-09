require('dotenv').config();
const { readdirSync } = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
	]
});

const eventFiles = readdirSync('./events').filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on( event.name, async (...args) => await event.execute(...args, client));
	}
}

client.commands = new Collection();
client.slashCommands = new Collection();
client.buttonCommands = new Collection();
client.selectCommands = new Collection();
client.modalCommands = new Collection();
client.cooldowns = new Collection();
client.autocompleteInteractions = new Collection();

const slashCommands = readdirSync('./interactions/slash');

for (const module of slashCommands) {
	const commandFiles = readdirSync(`./interactions/slash/${module}`).filter((file) => file.endsWith('.js'));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/slash/${module}/${commandFile}`);
		client.slashCommands.set(command.data.name, command);
	}
}

const autocompleteInteractions = readdirSync('./interactions/autocomplete');

for (const module of autocompleteInteractions) {
	const files = readdirSync(`./interactions/autocomplete/${module}`).filter((file) => file.endsWith('.js'));

	for (const interactionFile of files) {
		const interaction = require(`./interactions/autocomplete/${module}/${interactionFile}`);
		client.autocompleteInteractions.set(interaction.name, interaction);
	}
}

const buttonCommands = readdirSync('./interactions/buttons');

for (const module of buttonCommands) {
	const commandFiles = readdirSync(`./interactions/buttons/${module}`).filter((file) => file.endsWith('.js'));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/buttons/${module}/${commandFile}`);
		client.buttonCommands.set(command.id, command);
	}
}

const modalCommands = readdirSync('./interactions/modals');

for (const module of modalCommands) {
	const commandFiles = readdirSync(`./interactions/modals/${module}`).filter((file) => file.endsWith('.js'));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/modals/${module}/${commandFile}`);
		client.modalCommands.set(command.id, command);
	}
}

const selectMenus = readdirSync('./interactions/select-menus');

for (const module of selectMenus) {
	const commandFiles = readdirSync(`./interactions/select-menus/${module}`).filter((file) => file.endsWith('.js'));
	for (const commandFile of commandFiles) {
		const command = require(`./interactions/select-menus/${module}/${commandFile}`);
		client.selectCommands.set(command.id, command);
	}
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT, process.env.GUILD),
            // Routes.applicationCommands(process.env.CLIENT),
            { body: [...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON())] }
        );
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {console.error(error);}
})();

client.login(process.env.TOKEN);