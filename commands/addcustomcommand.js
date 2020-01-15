const cc = require("./../mongodb/cc");
const Discord = require("discord.js");
const mongoose = require("mongoose");

module.exports.run = async(client, message, args) => {
  if(!args[0]) return message.channel.send(`type a command name -_-`);
  cc.findOne({name: 'cc', serverid: message.guild.id}).then(result => {
  let first = args.join(' ');
  let sec;
  message.channel.send(`Type a response for the command`).then(c => {
    let filter = m => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(async collected => {
      if(collected.first().content) {
        sec = collected.first().content;
      }
    }).catch(() => {
      message.channel.send(`Looks like you're afk. Use command again.`)
    
  }).then(a => {
  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .setFooter(client.config.footer, client.user.avatarURL)
    if(!result || result == []) {
      let c = []
      c.push({
        name: first,
        response: sec
      })
      let newDoc = new cc({
        _id: new mongoose.Types.ObjectId(),
        name: 'cc',
        serverid: message.guild.id,
        commands: c
      });
      embed.setDescription("Saved `" + first + "` with `" + sec + "`.")
      newDoc.save().catch(console.error);
      message.channel.send(embed);
    }else{
      if(result.commands.some(r => first === r.name)) return message.channel.send(`There is already a command named that!`);
      if(result.commands.length === 5) {
        embed.setDescription(`Sorry You have reached the maximum custom commands for this guild. Buy premium version to add more!`);
        return message.channel.send(embed);
      }
      if(!result.commands == []) {
        if(result.commands){ var c = result.commands ? result.commands : [] } else { var c = [] };
        c.push({
          name: first,
          response: sec
        });
        let newDoc = new cc({
          _id: new mongoose.Types.ObjectId(),
          name: 'cc',
          serverid: message.guild.id,
          commands: c
        });
        cc.deleteOne({name: "cc", serverid: message.guild.id}).catch(console.error);
        newDoc.save().catch(console.error);
        embed.setDescription("Added `" + first + "` with response `" + sec + "`.");
        message.channel.send(embed);
      }
    }
  })
  })
  })
}

module.exports.help = {
  name: "addcustomcommand",
  category: "Custom Command/Custom Response",
  description: "Add a custom command/response",
  aliases: ["addcc"],
  Usage: "addcustomcommand <name> <response>"
}