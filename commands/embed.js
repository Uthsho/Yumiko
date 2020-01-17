const Discord = require("discord.js");
module.exports.run = async(client, message, args) => {
  if(!args[0]) return message.channel.send(`You must specify test`)
  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setThumbnail(message.guild.iconURL)
  .setFooter(client.config.footer, client.user.avatarURL)
  .setTimestamp()
  .setDescription(args.join(' '))
  message.channel.send(embed);
}

module.exports.help = {
  name: 'embed',
  category: "Moderation",
  description: "Send embed messages",
  Usage: "embed <text>"
}