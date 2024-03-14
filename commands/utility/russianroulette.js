const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('russianroulette')
		.setDescription('Are You Sure About Doing This?'),

	async execute(interaction) {
		const Button_1 = new ButtonBuilder()
			.setCustomId('Button_1')
			.setLabel('1')
			.setStyle(ButtonStyle.Danger);

		const Button_2 = new ButtonBuilder()
			.setCustomId('Button_2')
			.setLabel('2')
			.setStyle(ButtonStyle.Danger);

		const Cancel = new ButtonBuilder()
			.setCustomId('Cancel')
			.setLabel('I regert it :c')
			.setStyle(ButtonStyle.Success);

		const row = new ActionRowBuilder()
			.addComponents(Button_1, Button_2, Cancel);

		const Num = Math.floor(Math.random() * 10);

		const response = await interaction.reply({
			content: 'Select a button to decide your destiny :D',
			components: [row],
		});

		const collectorFilter = i => i.user.id === interaction.user.id;
		const target = interaction.user;
		try {
			const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });
			if (confirmation.customId === 'Button_1') {
				if (Num < 5) {
					await confirmation.update({ content: 'You survived!', components: [] });
				}
				else if (Num >= 5) {
					await confirmation.update({ content: 'You died. You are getting kick out from this server in 5 seconds.', components: [] });
					await interaction.guild.members.kick(target);
					await confirmation.update({ content: `Cya ${interaction.user.id}` });
				}
			}
			else if (confirmation.customId === 'Button_2') {
				if (Num < 5) {
					await confirmation.update({ content: 'You died. You are getting kick out from this server in 5 seconds.', components: [] });
					await interaction.guild.members.kick(target);
					await confirmation.update({ content: `Cya ${interaction.user.id}` });
				}
				else if (Num >= 5) {
					await confirmation.update({ content: 'You survived!', components: [] });
				}
			}
			else if (confirmation.customId === 'Cancel') {
				await confirmation.update({ content: 'Action cancelled', components: [] });
			}
		}
		catch (e) {
			await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
		}
	},
};