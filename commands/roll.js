module.exports =
{
	name: 'roll',
	description: 'rolls a random number',
	execute(message, args) {
		if (typeof args[0] != "string")
		{
			args[0]="6"; 		//if no additional arguments were given default to six
		} else if (isNaN(args[0]))
		{
			return message.channel.send("Can I get a number to roll up to?");
		}

		let rand = Math.floor(Math.random() * (+args[0])+1);
		
		message.channel.send('Rolled: `'+rand+'`');
	}
}