const Discord = require('discord.js');
const { Client, MessageEmbed, MessageAttachment } = require('discord.js');
const ms = require('ms');
const fs = require('fs');
const ytdl = require("ytdl-core");

//const { kill } = require('process');

const client = new Discord.Client();

const prefix = '-';

const statusCount = 18;
const statusFile = require('./status.js');
//const { connect } = require('http2');
const queue = new Map();	//music queue

//command collection
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles)
{
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}


//bot ready up and setup custom status routine
client.once('ready', () => {
	console.log("Chime is online and connected to " + client.guilds.cache.size + " server(s)!");
	changeStatus();
});


//keyword response
client.on('message', message => {
	if (message.content.includes('raj')) {
		if (message.author.bot) return;
		client.commands.get('rajReply').execute(message);
	}

	if (message.content.includes('homesick')) {
		if (message.author.bot) return;

		const attachment = new MessageAttachment('./images/homesick.PNG');	//load gif
		message.channel.send(attachment);
	}

	if (message.content.includes('field')) {
		if (message.author.bot) return;

		client.commands.get('fieldReply').execute(message);
	}
});

client.on('message', async (message) => {
	if(message.author.bot) return;
	const args = message.content.trim().split(/ +/g);
	if((args[0].toLowerCase() == 'i\'m' || args[0].toLowerCase() == 'im') && (args[1])){
			message.channel.send(`Hi ${args.slice(1).join(' ')}!`);
	}
});

//keyword reaction
client.on('message', message => {
	if (message.content.includes('cool')) {

		message.react('😎');
	}
	if (message.content.includes('fire')) {
		message.react('🔥');
	}
	if (message.content.includes('chime')) {
		message.react('🔔');
	}
});
//server greeting
client.on('guildMemberAdd', member => {
	client.commands.get('greeting').execute(member);
});

//basic commands
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot)
		return;

	const args = message.content.slice(prefix.length).split(" ");
	const command = args.shift().toLowerCase();
	const serverQueue = queue.get(message.guild.id);
	switch (command)
	{
		case 'help':
			help(message);
			break;
		case 'funfact':
			client.commands.get('funfact').execute(message, args);
			break;
		case 'cat':
			client.commands.get('cat').execute(message, args);
			break;
		case 'roll':
			client.commands.get('roll').execute(message, args);
			break;
		case 'flip':
			client.commands.get('flip').execute(message, args);
			break;
		case 'status':
			client.commands.get('status').execute(message, args);
			break;
		case 'avatar':
			message.reply(message.author.displayAvatarURL());
			break;
		case 'play':
			playMusic(message, serverQueue);
			break;
		case 'skip':
			skip(message, serverQueue);
			break;
		case 'stop':
			stop(message, serverQueue);
			break;
		case 'hide':
			client.commands.get('hide').execute(message, args);
			break;
		case 'timeout':
			client.commands.get('TimeOut').execute(message, args);
			break;
		default:
	}

});

///////////////////////////////////////////////////////////////////////////////////////////

async function playMusic(message, serverQueue) {
	const args = message.content.split(" ");

	const voiceChannel = message.member.voice.channel;

	if (!(message.channel.id==='746208065073709187'))
	{
		return message.channel.send(
			"Hey, can you send this in *bot-commands*, This is here to reduce spam."
		);
	}
console.log('sadge');
	if (!voiceChannel)
		return message.channel.send(
			"Hop into a voice channel first so I can play some tunes!"
		);
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
		return message.channel.send(
			"Sorry! I don't have permissions to do this."
		);
	}

	if (!args[1])
	{
		return message.channel.send(
			"Whoops! I need a valid Youtube link."
		);
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.videoDetails.title,
		url: songInfo.videoDetails.video_url
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};

		queue.set(message.guild.id, queueContruct);	//queueing songs

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		return message.channel.send(`**${song.title}** is now in the queue!`);
	}
}

function skip(message, serverQueue) {
	if (!(message.channel.id==='746208065073709187'))
	{
		return message.channel.send(
			"Hey, can you send this in *bot-commands*? This is here to reduce spam."
		);
	}
	if (!message.member.voice.channel)
		return message.channel.send(
			"Join a voice channel first!"
		);
	if (!serverQueue)
		return message.channel.send("The queue is empty.");
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!(message.channel.id==='746208065073709187'))
	{
		return message.channel.send(
			"Hey, can you send this in *bot-commands*? This is here to reduce spam."
		);
	}

	if (!message.member.voice.channel)
		return message.channel.send(
			"Join a voice channel first!"
		);
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);
	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection
		.play(ytdl(song.url))
		.on("finish", () => {
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on("error", error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	serverQueue.textChannel.send(`Now playing: 🎵 **${song.title}** 🎵`);
}






//final line
client.login('INSERT TOKEN');	//token

function changeStatus() {
	let index = Math.floor(Math.random() * (statusCount + 1));
	statusFile.execute(client, index);
	var cd = Math.floor(Math.random() * (12 - 6) + 6);		//changes status from 6-12 minutes
	console.log('Changing status to #' + index + ', changing in ' + cd + '...');
	setTimeout(changeStatus, ms(cd+'m'));
}

function help(message)
{
	// If the message is "how to embed"\
	const attachment = new MessageAttachment('./images/icon.jpg', 'icon.jpg');	//load png
	const embed = new MessageEmbed()
		// Set the title of the field
		.setTitle('ChimeBot Command List')
		// Set the color of the embed
		.setColor(0xf6c800)
		// Set the main content of the embed
		.attachFiles(attachment)
		.setThumbnail('attachment://icon.jpg')
		.setDescription('-help - *lists basic commands* \n\
		-status - *shows bot status* \n\
		-funfact - *tells a fun fact* \n\
		-cat - *shows a cat! 🐈* \n\
		-flip - *does a coin flip* \n\
		-roll - *rolls a random number* \n\
		-avatar - *gives you your avatar* \n\
		-hide - *hides you in a hidden channel* \n\
		-timeout - *lets admins put people in timeout* \n\
		-play - *plays and adds music to queue* \n\
		-skip - *skips current music* \n\
		-stop - *clears the queue*')
		.setFooter('Have Fun!');
	// Send the embed to the same channel as the message
	message.channel.send(embed);
}