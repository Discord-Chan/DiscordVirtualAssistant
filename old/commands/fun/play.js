const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "play",
    aliases: ["p"],
    category: "fun",
    description: "Vibing~~",
    usage: "play",
    run: async (client, message, args) => {
        const music = args.join(" ");

        client.distube
        .play(message, music);
    }
}

