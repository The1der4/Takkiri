const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		const serverEmbed = new EmbedBuilder()
			.setColor(0x7F81B2)
			.setTitle(`${interaction.guild.name}`)
			.setURL('https://discord.gg/eCCkKnEsDK')
			.setThumbnail(`${interaction.guild.iconURL()}`)
			.setAuthor({ name: 'Server Info', iconURL: `${interaction.guild.iconURL()}` })
			.setDescription(`Owner:<@${interaction.guild.ownerId}>`)
			.addFields(
				{ name: 'MemberCount', value: `${interaction.guild.memberCount}`, inline: true },
				{ name: 'BoostCount', value: `${interaction.guild.premiumSubscriptionCount}`, inline: true },
				{ name: 'NitroTier', value: `${interaction.guild.premiumTier}`, inline: true },
			)
			.setTimestamp()
			;

		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply({ embeds: [serverEmbed] });
	},
};

/* const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
 */