module.exports =
{
	name: 'funfact',
	description: 'gives a random fact',
	async execute(message, args) {
		const fetch = require('node-fetch');
		message.channel.send(await fetch('https://uselessfacts.jsph.pl/random.txt?language=en').then(response => response.text()));
	}
}