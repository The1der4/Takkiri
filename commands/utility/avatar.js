const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Show User\'s Profile Picture'),
	async execute(interaction) {
		const avatarEmbed = new EmbedBuilder()
			.setColor(0x7F81B2)
			.setDescription(`${interaction.user.username}'s avatar`)
			.setImage(`${interaction.user.displayAvatarURL()}?size=512&quality=lossless`)
			.setTimestamp();
		await interaction.reply({ embeds: [avatarEmbed] });
	},
};