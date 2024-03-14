const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder, EmbedBuilder, Events } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { Client, GatewayIntentBits } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Create a embed'),
	async execute(interaction) {
		const newModal = new ModalBuilder()
			.setCustomId(`myModal-${interaction.user.id}`)
			.setTitle('My Modal');

		const colorInput = new TextInputBuilder()
			.setCustomId('colorInput')
			.setLabel('Enter embed color. Example: 0xFFA5A5')
			.setStyle(TextInputStyle.Short);

		const titleInput = new TextInputBuilder()
			.setCustomId('titleInput')
			.setLabel('Enter embed title')
			.setStyle(TextInputStyle.Short);

		const descriptionInput = new TextInputBuilder()
			.setCustomId('descriptionInput')
			.setLabel('Enter description')
			.setStyle(TextInputStyle.Short);

		const imageInput = new TextInputBuilder()
			.setCustomId('imageInput')
			.setLabel('Enter Image. (Using url)')
			.setStyle(TextInputStyle.Short);


		const firstActionRow = new ActionRowBuilder().addComponents(colorInput);
		const secondActionRow = new ActionRowBuilder().addComponents(titleInput);
		const thirdActionRow = new ActionRowBuilder().addComponents(descriptionInput);
		const fourthActionRow = new ActionRowBuilder().addComponents(imageInput);

		newModal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

		await interaction.showModal(newModal);

		interaction.awaitModalSubmit({ time: 60_000 });
	},
};

client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isModalSubmit()) return;
	const colorValue = interaction.fields.getTextInputValue('colorInput');
	const titleValue = interaction.fields.getTextInputValue('titleInput');
	const descriptionValue = interaction.fields.getTextInputValue('descriptionInput');
	const imageValue = interaction.fields.getTextInputValue('imageInput');
	const newEmbed = new EmbedBuilder()
		.setColor(`${colorValue}`)
		.setTitle(`${titleValue}`)
		.setDescription(`${descriptionValue}`)
		.setImage(`${imageValue}`)
		.setTimestamp();
	interaction.channel.send({ embeds: [newEmbed] });
});