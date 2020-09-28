module.exports =
{
	name: 'greeting',
	description: 'greets users',
	execute(member) {
		const channel = member.guild.channels.cache.find(channel => channel.name === "general");
		if (!channel) { return; }
		console.log(`Greeting ${member.user.tag} to the server!`);
		channel.send(`Hello ${member}, Welcome to the server!`);
	}
}