const hastebin = require("hastebin-gen");
const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    const msg = args.join("");
    if(!args[0]) return message.channel.send(`Put a text please.`)
        const haste = await hastebin(msg, { extension: "txt" })
        const embed = new Discord.RichEmbed()
        .setAuthor(`Done`)
        .setDescription(haste)
        message.channel.send(embed);
} 

module.exports.help = {
  name: "hastebin",
  category: "utility",
  description: "Generate a hastebin i guess",
  Usage: "hastebin <text>"
}