module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isSelectMenu()) return;
		const command = interaction.client.selectCommands.get(interaction.customId);

		if (!command)  return await require('../messages/defaultSelectError').execute(interaction);

		try {
			await command.execute(interaction);
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: 'There was an issue while executing that select menu option!',
				ephemeral: true
			});
		}
	}
};