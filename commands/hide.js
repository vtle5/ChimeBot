module.exports =
{
	name: 'hide',
	description: 'moves users into a hidden channel',
	execute(message, args)
	{
		const ms = require('ms');
		if (typeof args[0] === 'undefined')		//if no additional arguments were given
		{
			return message.channel.send('Can you clarify who you want to hide? Use *me* or *us* as modifiers.');
		}
		if (args[0].toLowerCase() === 'me')		//Argument ME
		{
			if (message.member.voice.channelID) {
				message.channel.send('Alrighty, prepare yourself!').then(msg => {
					msg.delete({ timeout: 8000 });
					message.delete({ timeout: 8000 });				//reply and delete both messages
				}).catch(console.error);

				console.log(`Hiding ${message.member.user.tag}...`)
				message.member.voice.setChannel('368565471504498700');	//move to voice channel
			} else {
				message.channel.send('This function works only for voice channels.');		//if the user is not in a voice channel

            }
		} else if (args[0].toLowerCase() === 'us')	//argument US
		{
			if (message.member.voice.channelID) {
				message.channel.send('Buckle up everyone! We\'re going to a hidden field!').then(msg => {
					msg.delete({ timeout: 13000 });
					message.delete({ timeout: 13000 });				//reply and delete both messages
				}).catch(console.error);

				for (const [memberID, member] of message.member.voice.channel.members) {
					member.voice.setChannel('368565471504498700')
						.then(() => console.log(`Mass hiding ${member.user.tag}...`))		//moving all members
						.catch(console.error);
				}

			} else {
				message.channel.send('This function works only for voice channels.');		//if the user is not in a voice channel
			}
		} else
		{
			message.channel.send('Use *me* or *us* as modifiers for hiding.');	//invalid argument
		}
	}
}