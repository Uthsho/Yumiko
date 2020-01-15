const Discord = require("discord.js");
module.exports.run = async(client, message, args) => {
  let s = message.channel
  if(!args[0]) return s.send(`Type a channel name or channel id -_-`);
  let channel = message.mentions.channels.first() || client.channels.get(args[0]);
  if(!channel) return message.channel.send(`Invalid channel mention or channel name.`);
  if(!args[1]) return message.channel.send(`Type a text! -_-`);
  let embed = new Discord.RichEmbed()
  .setTitle(`Announcement!`)
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setDescription(args.slice(1).join(" "))
  .setFooter(client.config.footer, client.user.avatarURL)
  channel.send(embed).then(c => {
    c.react("👍");
    c.react("👎")
  });
  s.send(`Successfully sent in ${channel.toString()}`);
}

module.exports.help = {
  name: "announce",
  category: "Moderation",
  Description: "Send announcement in a channel!",
  Usage: "announce <#channelname or channel id> <text>"
}