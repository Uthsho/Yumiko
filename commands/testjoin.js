const welcome = require("./../mongodb/welcome");
const Discord = require("discord.js");

module.exports.run = async(client, message, args, prefix) => {
  welcome.findOne({name: 'welcome', guildid: message.guild.id}).then(async result => {
    if(!result || result == []) return message.channel.send(`welcome feature is not set Dm a administrator to enable using ${prefix}setwelcome.`);
    client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
  });
}

module.exports.help = {
  name: "testjoin",
  category: "Moderation",
  description: "Test the welcome feature :)",
  Usage: "testjoin"
}