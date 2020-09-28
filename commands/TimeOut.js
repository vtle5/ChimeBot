module.exports =
{
	name: 'TimeOut',
	description: 'Temporary ban',
	execute(message, args)
	{
		if (message.member.hasPermission('BAN_MEMBERS') || message.member==message.guild.member(message.mentions.users.first()))		
		{
			const ms = require('ms');
			let person;
			person = message.guild.member(message.mentions.users.first());

			if (!person) { return message.reply("I don't see that user."); }	//if not target given

			if (person.roles.cache.has('744733053548625942')) 	//if already in time out
			{
				return message.reply("This user is already in timeout.");
            }
			console.log(`${message.member.user.tag} is attempting to put ${person.user.tag} in timeout...`);
			message.channel.send(`${person.user} has been put in timeout by ${message.member.user}`);

			setTimeout(function () {
				if (person.voice.channelID)
				{
					person.voice.setChannel('528814867113705472');		//move to timeout channel
				}

				person.roles.add('744733053548625942').catch(console.error);	//snap user after 6s

				console.log(`Successfully put ${person.user.tag} in timeout `);

				setTimeout(function () {
					person.roles.remove('744733053548625942').catch(console.error);
					console.log(`removing ${person.user.tag} from timeout.`);

				}, ms(10 + 'm'));		//10 minute ban

			}, ms('10s'));		//this delay is here to show the affected user a warning before putting them in timeout
		}
		else { message.channel.send('You don\'t have permissions!');}
	}
}