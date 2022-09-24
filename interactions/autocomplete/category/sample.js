module.exports = {
	name: 'sample',
	async execute(interaction) {
        if (interaction.isAutocomplete()) {
            const focusedValue = interaction.options.getFocused();
            const choices = ['your', 'choices'];
            const filtered = choices.filter((choice) => choice.startsWith(focusedValue));

            await interaction.respond(
                filtered.map((choice) => ({ name: choice, value: choice }))
            );
        }
	}
};