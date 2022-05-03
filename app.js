const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on('ready', () => {
    console.log('Bot is ready');
});
  
client.login(process.env.BOT_TOKEN)

client.on('messageCreate', (msg) => {
    if (msg.content === 'Hello') msg.reply('Hi');
});

// Adding jokes function

// Jokes from dcslsoftware.com/20-one-liners-only-software-developers-understand/
// www.journaldev.com/240/my-25-favorite-programming-quotes-that-are-funny-too
const jokes = [
    'I went to a street where the houses were numbered 8k, 16k, 32k, 64k, 128k, 256k and 512k. It was a trip down Memory Lane.',
    '“Debugging” is like being the detective in a crime drama where you are also the murderer.',
    'The best thing about a Boolean is that even if you are wrong, you are only off by a bit.',
    'A programmer puts two glasses on his bedside table before going to sleep. A full one, in case he gets thirsty, and an empty one, in case he doesn’t.',
    'If you listen to a UNIX shell, can you hear the C?',
    'Why do Java programmers have to wear glasses? Because they don’t C#.',
    'What sits on your shoulder and says “Pieces of 7! Pieces of 7!”? A Parroty Error.',
    'When Apple employees die, does their life HTML5 in front of their eyes?',
    'Without requirements or design, programming is the art of adding bugs to an empty text file.',
    'Before software can be reusable it first has to be usable.',
    'The best method for accelerating a computer is the one that boosts it by 9.8 m/s2.',
    'I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing.',
    'There are two ways to write error-free programs; only the third one works.',
];

var queue = [];

client.on('messageCreate', (msg) => {
    if (msg.content === '?joke') {
        msg.channel.send(jokes[Math.floor(Math.random() * jokes.length)]);
    }
});

client.on('messageCreate', (msg) => {
    if (msg.content === '?queue') {
        if (queue.length==0) {
            msg.channel.send("Oh! It seems like there's nobody left in the queue right now.");
        } else {
            msg.channel.send(`Here's the queue!`)
            queueStr = ''
            for (let i = 0; i < queue.length; i++) {
                queueStr += `\n(${i+1}) ` + queue[i];
            };
            msg.channel.send(queueStr);
        }
    }
});

client.on('messageCreate', (message) => {
    const prefix = '?'
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
    if (command === 'ping') {
		message.channel.send('Pong.');
    } else if (command === 'add') {
		if (!args.length) {
			return message.channel.send(`Uh, who did you want me to add?`);
        } else if (args.length > 1) {
            songStr = ''
            songSpl = args.splice(1)
            for (const ele of songSpl) {
                songStr += ele + ' ';
            };
            songStr = songStr.substring(0, songStr.length - 1) 
            queue.push(args[0] + ' - ' + songStr)
            return message.channel.send(`Okay! I just added [${args[0]}] to the queue! They're thinking of singing [${songStr}].`);
		} else {
            queue.push(args[0])
			return message.channel.send(`Okay! I just added [${args[0]}] to the queue!`);
		}

		message.channel.send(`First argument: ${args[0]}`);
    } else if (command === 'next') {
		if (queue.length == 0) {
			return message.channel.send(`Oh! Looks like there's nobody in the queue!`);
        } else if (queue.length == 2) {
            queue.shift()
            return message.channel.send(`That was nice! Next up in the queue is [${queue[0]}], who's the last person in the queue left.`)
        } else if (queue.length == 1) {
            queue.shift()
            return message.channel.send("Okay! There is now nobody in the queue left.")
		} else {
            queue.shift()
			return message.channel.send(`Good job! Next up in the queue is [${queue[0]}]!`);
		}

		message.channel.send(`First argument: ${args[0]}`);
	} else if (command === 'clear') {
		if (queue.length == 0) {
			return message.channel.send(`Oh! It's okay, there's nobody in the queue right now!`);
        } else {
            queue = []
			return message.channel.send(`Okay! I went ahead and cleared the queue for you.`);
		}

		message.channel.send(`First argument: ${args[0]}`);
	}
});
