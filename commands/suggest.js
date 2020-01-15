const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
  if(!args[0]) return message.channel.send(`You want me to send a empty suggestion? TYPE SOMETHING`);
  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setDescription(args.join(" "))
  .setFooter(client.config.footer, client.user.avatarURL)
  .setTimestamp()
  let c = await client.channels.get("665476692885897217").send(embed)
  c.react("👍")
  c.react("👎")
  message.channel.send(`Sent your suggestion to ${client.channels.get("665476692885897217").toString()}. Join support server to see!`)
}

module.exports.help = {
  name: "suggest",
  category: "utility",
  description: "Send us suggestions :))",
  Usage: "suggest <suggestion>"
}