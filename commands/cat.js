module.exports =
{
	name: 'cat',
	description: 'gives a random cat',
	async execute(message, args) {
		const fetch = require('node-fetch');
		
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
		message.channel.send(file);
	}
}