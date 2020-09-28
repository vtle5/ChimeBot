module.exports =
{
	execute(client, index) {

		switch (index) {
			case 0:
				client.user.setActivity('Computers', { type: 'STREAMING', url: "https://www.youtube.com/watch?v=NWD7iqtOJSE" });
				break;
			case 1:
				client.user.setActivity('some chill tunes', { type: 'LISTENING' });
				break;
			case 2:
				client.user.setActivity('Raj Game', { type: 'PLAYING' });
				break;
			case 3:
				client.user.setActivity('for activity', { type: 'WATCHING' });
				break;
			case 4:
				client.user.setActivity('with ideas', { type: 'PLAYING' });
				break;
			case 5:
				client.user.setActivity('the sky', { type: 'WATCHING' });
				break;
			case 6:
				client.user.setActivity('birds?', { type: 'LISTENING' });
				break;
			case 7:
				client.user.setActivity('with the field', { type: 'PLAYING' });
				break;
			case 8:
				client.user.setActivity('Marble Hills', { type: 'PLAYING' });
				break;
			case 9:
				client.user.setActivity('chilling out', { type: 'STREAMING', url: "https://www.youtube.com/watch?v=Yw6u6YkTgQ4" });
				break;
			case 10:
				client.user.setActivity('some games', { type: 'PLAYING' });
				break;
			case 11:
				client.user.setActivity('the veil', { type: 'LISTENING' });
				break;
			case 12:
				client.user.setActivity('for bees', { type: 'WATCHING'});
				break;
			case 13:
				client.user.setActivity('field stream', { type: 'STREAMING', url: "https://www.youtube.com/watch?v=4MWVLLSXab0" });
				break;
			case 14:
				client.user.setActivity('with code', { type: 'PLAYING'});
				break;
			case 15:
				client.user.setActivity('the stars', { type: 'WATCHING'});
				break;
			case 16:
				client.user.setActivity('with entities', { type: 'PLAYING'});
				break;
			case 17:
				client.user.setActivity('the field', { type: 'LISTENING'});
				break;
			case 18:
				client.user.setActivity('for home', { type: 'WATCHING'});
				break;
			default:
		}
	}
}