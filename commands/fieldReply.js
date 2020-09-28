module.exports =
{
	name: 'fieldReply',
	description: 'replies to keyword field',
	execute(message) {
		message.channel.startTyping();

		setTimeout(function () {
			let rand = Math.floor(Math.random() * (4 + 1));
			switch (rand) {
				case 0:
					message.channel.send('Did someone say field?');
					break;
				case 1:
					message.channel.send('The flowers are looking nice today.');
					break;
				case 2:
					message.channel.send('You should come out here sometime.');
					break;
				case 3:
					message.channel.send('Make sure you have fun!');
					break;
				case 4:
					message.channel.send('I saw some bees today.');
					break;
				default:
			}
			message.channel.stopTyping();

		}, 1000*3);

	}
}