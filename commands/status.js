module.exports =
{
	name: 'status',
	description: 'bot status',
	execute(message, args) {
		let rand = Math.floor(Math.random() * (8 + 1));
		switch (rand) {
			case 0:
				message.channel.send('I\'m just chilling');
				break;
			case 1:
				message.channel.send('Fully operational!');
				break;
			case 2:
				message.channel.send('I\'m just investigating something...');
				break;
			case 3:
				message.channel.send('Nothing interesting to report here');
				break;
			case 4:
				message.channel.send('The flowers are looking nice today.');
				break;
			case 5:
				message.channel.send('listening to some nice music right now.');
				break;
			case 6:
				message.channel.send('Just looking up.');
				break;
			case 7:
				message.channel.send('Having some daydreams.');
				break;
			case 8:
				message.channel.send('I remember when the skies were blue.');
				break;
			default:
		}
	}
}