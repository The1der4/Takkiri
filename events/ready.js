const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client, interaction) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		client.user.setPresence({
			status:'idle',
			activities:[{
				type: ActivityType.Playing,
				name: 'Kissing Boy Simulator',
				/* state:'Custom status displayed' */
			}],
		});

		/* 8am Alarm */
		function outputWordAt8AM() {
			const now = new Date();
			const targetTime = new Date(now);

			targetTime.setHours(8, 0, 0, 0);
			// Set to 8:00:00 AM

			// If it's already past 8 AM, set for the next day
			if (now > targetTime) {
				targetTime.setDate(targetTime.getDate() + 1);
			}

			const timeUntil8AM = targetTime - now;

			setTimeout(() => {
				interaction.reply('每日關心');
				// Schedule the next day's output
				outputWordAt8AM();
			}, timeUntil8AM);
		}
		// Start the process
		outputWordAt8AM();
	},
};