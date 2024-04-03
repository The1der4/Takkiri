const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: 'database/birthday.sqlite' });

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('bdlist')
		.setDescription('List birthday'),
	async execute(interaction) {
		// Get current date
		const currentDate = new Date();

		// Get today's date without the year
		const todayWithoutYear = new Date(currentDate.getMonth() + 1 + '/' + currentDate.getDate());

		// Query the database to find the next birthday
		db.get('SELECT Username, bdY, bdM, bdD FROM birthday WHERE bdY || "-" || bdM || "-" || bdD >= ? ORDER BY bdY, bdM, bdD LIMIT 1', [todayWithoutYear.toISOString().slice(0, 10)], (err, row) => {
			if (err) {
				console.error('Error querying database:', err);
				return;
			}

			if (row) {
				interaction.reply(`The next birthday is ${row.Username}'s birthday on ${row.bdY}-${row.bdM}-${row.bdD}`);
			}
			else {
				interaction.reply('No upcoming birthdays found.');
			}

			// Close the database connection
			db.close();
		});

		const bdEmbed = new EmbedBuilder()
			.setColor(0x7F81B2)
			.setTitle('Birthday List')
			.setThumbnail(`${interaction.guild.iconURL()}`)
			.setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` })
			// .setDescription(`Next Comming Birthday: ${}`)
			;
		interaction.reply({ embeds: [bdEmbed] });
	},
};