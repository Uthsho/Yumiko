const Discord = require("discord.js");
const pre = require("./../mongodb/prefix");
const mongoose = require("mongoose");

module.exports.run = async(client, message, args) => {
  let prefix = args.join(" ");
      const noperms = new Discord.RichEmbed()
        .setTitle(message.author.tag)
        .setDescription(`:x: Sorry ${message.author.tag} you did not specify a prefix.`)
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Sorry** but you need ```ADMINISTRATOR``` permission to use this command");
        let newprefix = args.join(" ");
        if(!args[0]) return message.channel.send(noperms);
      pre.findOne({name: "prefix", preid: message.guild.id}).then(result => {
        let duck = new pre({
            _id: new mongoose.Types.ObjectId(),
            name: "prefix",
            preid: message.guild.id,
            prefix: prefix
          })
        let send = new Discord.RichEmbed()
        .setTitle(`${message.author.tag} used prefix command`)
        .setDescription(`**Successfully** changed the prefix to **${newprefix}**`)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter(client.config.footer, client.user.avatarURL)
        message.channel.send(send);
        if(!result || result == []) {
          duck.save().catch(console.error);
        }else{
          pre.deleteOne({name: "prefix", preid: message.guild.id}).catch(console.error)
          duck.save().catch(console.error)
        }
      })
}

module.exports.help = {
  name: "setprefix",
  category: "Moderation",
  description: "change prefix of the server!",
  aliases: ["prefix", "sprefix"],
  Usage: "setprefix <prefix of your choice>",
}