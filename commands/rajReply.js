module.exports =
{
	name: 'rajReply',
	description: 'replies to keyword raj',
	execute(message) {
		message.channel.startTyping();

		setTimeout(function () {
			let rand = Math.floor(Math.random() * (4 + 1));
			switch (rand) {
				case 0:
					message.channel.send('That name sounds familiar...');
					break;
				case 1:
					message.channel.send('What was that name?');
					break;
				case 2:
					message.channel.send('Something\'s at the tip of my tongue...');
					break;
				case 3:
					message.channel.send('Hey I think I might know him!');
					break;
				case 4:
					message.channel.send('I\'m feeling a bit dizzy...');
					break;
				default:
			}
			message.channel.stopTyping();

		}, 1000*3);

	}
}