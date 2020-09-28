module.exports =
{
	name: 'flip',
	description: 'flips a coin',
	execute(message, args)
	{
		let rand = Math.floor(Math.random() * (1+1));
		switch (rand)
		{
			case 0:
				message.channel.send("Coin Flip: `Tails`");
				break;
			case 1:
				message.channel.send("Coin Flip: `Heads`");
				break;
			default:
		}
	}
}