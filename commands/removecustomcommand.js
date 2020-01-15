const cc = require("./../mongodb/cc");
const Discord = require("discord.js");
const mongoose = require("mongoose");

module.exports.run = async(client, message, args) => {
  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setFooter(client.config.footer, client.user.avatarURL)
  .setTimestamp()
  .setColor("RANDOM")
  .setThumbnail(message.guild.iconURL)
  cc.findOne({name: "cc", serverid: message.guild.id}).then(res => {
    if(!res || res == []) return message.channel.send(`There is no custom command for this guild!`);
    let desc = `Choose one of them from ${res.commands.length} of them \n`;
    let ah = res.commands;
    for(var i = 0; i < ah.length; i++) {
      let w = ah[i];
      desc+=`${i} - Name: ${w.name} , response: ${w.response} \n`;
    }
    embed.setDescription(desc);
    message.channel.send(embed).then(c => {
      const filter = m => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(async collected => {
      let re = collected.first().content
      let no = parseInt(re);
      if(no === "0") {
        if(!no) return message.channel.send(`Looks like you didn't type a valid number try again!`);
        cc.deleteOne({name: "cc", serverid: message.guild.id}).catch(console.error)
        message.channel.send(`Removed ${ah[no].name} from the database`);
      }else{
      if(!ah[no]) return message.channel.send(`There is no number like that.`);
      message.channel.send(`Removed ${ah[no].name} from the database`);
      ah.splice(no, 1)
      let newDoc = new cc({
        _id: new mongoose.Types.ObjectId(),
        name: 'cc',
        serverid: message.guild.id,
        commands: ah
      });
      cc.deleteOne({name: "cc", serverid: message.guild.id}).catch(console.error)
      if(ah.length === 0) return;
      newDoc.save().catch(console.error);
      }
    }).catch(err => {
      message.channel.send(`Looks like you're afk. Use command again.`)
    })
    });
  });
}

module.exports.help = {
  name: "removecustomcommand",
  category: "Custom Commmand/Custom Response",
  description: "remove a custom command/response",
  aliases: ["removecc"],
  Usage: "addcustomcommand <name> <response>"
}