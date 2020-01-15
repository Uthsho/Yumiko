const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
  let ch = message.mentions.channels.first() || message.channel;
  let channel = client.snipe.get(ch.id);
  if(!channel) return message.channel.send(`There is no message deleted!`);
  let user = client.users.get(channel.sender);
  let embed = new Discord.RichEmbed()
  .setAuthor(user.tag, user.avatarURL)
  .setDescription(channel.content)
  .setTimestamp()
  .setFooter(client.config.footer, client.user.avatarURL)
  .setColor("RANDOM")
  message.channel.send(embed);
}

module.exports.help = {
  name: "snipe",
  category: "Utility",
  description: "See the last deleted message",
  Usage: "snipe | snipe <channel mention>"
}