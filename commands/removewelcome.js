const welcome = require("./../mongodb/welcome");
const Discord = require("discord.js");
module.exports.run = (client, message, args) => {
  welcome.findOne({name: 'welcome', guildid: message.guild.id}).then(result => {
    if(!result || result == []) return message.channel.send(`Sorry you do not have welcome feature enabled in this server!`);
    welcome.deleteOne({name: 'welcome', serverid: message.guild.id}).catch(console.error)
    return message.channel.send(`Succesfully removed the welcome custom channel and disabled it!`);
  });
}

module.exports.help = {
  name: 'removewelcome',
  category: "Moderation",
  description: "Remove a custom welcome channel i guess",
  Usage: "removewelcome <channelmention/channelname/channelid>"
}