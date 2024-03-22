const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		client.user.setPresence({
			status:'idle',
			activities:[{
				type: ActivityType.Playing,
				name: 'Kissing Boy Simulator',
				/* state:'Custom status displayed' */
			}],
		});

		/* client.user.setActivity({
			name: 'Kissing Boy Simulator',
			type: ActivityType.Playing,
			url: 'https://the1der4.github.io/',
		});
		client.user.setStatus('idle',);
		*/
	},
};