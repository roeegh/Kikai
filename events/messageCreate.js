module.exports = {
	name: 'messageCreate',
	async execute(message) {
        if (message.author.bot) return;
        if (message.content.includes(`<@${message.client.user.id}>`) || message.content.includes(`<@!${message.client.user.id}>`)) message.channel.send(message.author.toString());
        if (message.content === '(\u256f\u00b0\u25a1\u00b0\uff09\u256f\ufe35 \u253b\u2501\u253b') message.channel.send('\u252c\u2500\u252c\ufeff \u30ce( \u309c-\u309c\u30ce');
	},
};