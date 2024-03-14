const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('choose')
		.setDescription('Chooses one of your option from your message.')
		.addStringOption(option =>
			option
				.setName('text')),
	async execute(interaction) {
		const text = interaction.option.addStringOption('text');
		const text2 = text.split('|');
		const randomizer = Math.floor(Math.random() * text2.length);
		const FinalOption = text2[randomizer];

		await interaction.reply(`I choose : ${FinalOption}`);
	},
};