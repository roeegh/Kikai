const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sample')
		.setDescription('This is a description of the sample slash command.'),
	async execute(interaction) {
		await interaction.reply({
			content: 'This was a reply from slash command handler!',
			ephemeral: true,
		});
	}
};