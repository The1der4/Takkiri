// const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// module.exports = {
//	cooldown : 5,
//	data: new SlashCommandBuilder()
//		.setName('gCreate')
//		.setDescription('DO NOT USE IT. MIGHT CAUSING ERROR.'),
//	async execute(interaction) {
//		const gSetup = new EmbedBuilder()
//			.setColor(0x0099FF)
//			.setTitle('抽一個人素我考')
//			.setAuthor({ name: `${interaction.user.username}` })
//			.setDescription('測試')
//			.setTimestamp();
//		await interaction.reply({ embeds:[gSetup] });
//	},
// };