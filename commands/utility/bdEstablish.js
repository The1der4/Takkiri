const { SlashCommandBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: 'database/birthday.sqlite' });

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('bdremember')
		.setDescription('Record your birthday')
		.addStringOption(option =>
			option
				.setName('date')
				.setDescription('Enter Your Birthday Date with format yyyy-mm-dd')
				.setRequired(true)),
	async execute(interaction) {
		// Import Cmd Message
		const bdarray = interaction.options.getString('date').split('-');

		if (bdarray.length == 1) {
			interaction.reply('Wrong Format. Please Redo the commands');
		}
		else {
			const bdY = bdarray[0];
			const bdM = bdarray[1];
			const bdD = bdarray[2];

			// Get Currect Date
			const currentdate = new Date();
			const cY = currentdate.getFullYear();
			const cM = currentdate.getMonth() + 1;
			const cD = currentdate.getDate();

			// distinguish whether it's a proper date
			if (bdY > cY) {
				interaction.reply('This year haven\'t exist yet. Please Redo the command');
			}
			else if (cM > 12) {
				interaction.reply('This month didn\'t exist. Please Redo the command');
			}
			else if (cD > 31) {
				interaction.reply('This day didn\'t exist. Please Redo the command');
			}
			else {
				// Check if the user's data exist
				if (await db.get('userInfo.UserID') == interaction.user.id) {
					interaction.reply('Your previous birthday data will be replaced');
				}

				// Set up User's Birthday Year/Month/Day into db
				await db.set('userInfo', {
					Username: `${interaction.user.username}`,
					UserID: `${interaction.user.id}`,
					GuildID: `${interaction.guild.ownerId}`,
					UserbdY: `${bdY}`,
					UserbdM: `${bdM}`,
					UserbdD: `${bdD}`,
				});
				interaction.reply(`Data Successfully Collected! Your birthday is ${bdY} / ${bdM} / ${bdD} .`);
			}
		}
	},
};