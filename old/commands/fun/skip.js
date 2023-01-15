const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "skip",
    aliases: ["s"],
    category: "fun",
    description: "next vibe~~",
    usage: "skip",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send('Du bist in gar keinem Voice Channel!!!');

        let queue = await client.distube.getQueue(message);
    
        if(queue) {
            client.distube.skip(message)
    
            message.channel.send('As you wish senpai~~')
        } else if (!queue) {
            return
        };
    }
}
