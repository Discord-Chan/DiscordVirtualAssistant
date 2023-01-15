const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

module.exports = {
  name: "stop",
  aliases: ["halt"],
  category: "fun",
  description: "not vibing anymore~~",
  usage: "stop",
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.channel.send("You are in no voice channel!!!  D:");

    let queue = await client.distube.getQueue(message);

    if (queue) {
      client.distube.stop(message);

      message.channel.send("As you wish senpai~~");
    } else if (!queue) {
      return;
    }
  },
};
