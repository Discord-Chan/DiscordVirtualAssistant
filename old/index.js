const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const {prefix, bot_info} = require('./config.json');

const DisTube = require('distube');


const client = new Client({
    disableEveryone: true
});

client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Spielt \`${song.name}\` - \`${song.formattedDuration}\`\nVorgeschlagen von: ${song.user} UwU`
	))
    .on("addSong", (message, queue, song ) => message.channel.send(
        `${song.name} - \`${song.formattedDuration}\`\n wurde hinzugefügt von ${song.user}`
    ))

client.commands = new Collection();
client.aliases = new Collection();

const RPC = require("discord-rpc");
const rpc = new RPC.Client({
    transport: "ipc"
});

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "me getting developed",
            type: "STREAMING"
        }
    }); 
});


config({
    path: __dirname + "/.env"
})

rpc.on("ready", () =>{
    rpc.setActivity({
        details: "Java and C#",
        state: "Coding~",
        startTimestamp: new Date(),
        largeImageKey: "samsung-virtual-assistant-sam-3d",
        largeImageText: "Visual Studio",
        smallImageKey: "peace",
        smallImageText: "Deathmaster- Level 100"
    });

    console.log("rich pressence is now active!")
});

// When the bot's online, what's in these brackets will be executed
client.on("ready", () => {
    console.log("--------------------------------------");
    console.log(bot_info.name);
    console.log(bot_info.version);
    console.log("--------------------------------------");
    console.log(`Hi, ${client.user.username} is now online!`);

    // Set the user presence
    client.user.setPresence({
        status: "online",
        activity: {
            name: "getting developed!",
            type: "STREAMING"
        }
    }); 
});

// When a message comes in, what's in these brackets will be executed
client.on("message", async message => {
    console.log(`${message.author.username} said: ${message.content}`);

    if(message.content === `${prefix}ping`){
        message.channel.send('Pong!');
    }
    else if(message.content === 'Hi' || message.content === 'hi'){
        message.channel.send('Hellu!');
    }


    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});








rpc.login({
    clientId: "849296710764986458"
});
// Login the bot
client.login(process.env.TOKEN);