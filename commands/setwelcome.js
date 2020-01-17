const welcome  = require("./../mongodb/welcome");
const Discord = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
  help: {
    name: "setwelcome",
    category: "Moderation",
    description: "Set welcome channel!",
    Usage: "setwelcome <#channel>"
  },
  run: async(client, message, args) => {
    if(!args[0]) return message.channel.send(`Mention a channel or channel id or channel name.`);
    let channel = message.mentions.channels.first() || message.guild.channels.find(r => r.name === args.join(" ")) || client.channels.get(args[0]);
    if(!channel) return message.channel.send(`Invalid channel mention or name or id.`);
    welcome.findOne({name: 'welcome', guildid: message.guild.id}).then(result => {
      if(!result || result == []) {
        let newDoc = new welcome({
          _id: new mongoose.Types.ObjectId(),
          name: 'welcome',
          guildid: message.guild.id,
          channel: channel.id
        });
        newDoc.save().catch(console.error);
        message.channel.send(`Saved ${channel.toString()} as welcome channel!`);
      }else{
        let hm = client.channels.get(channel);
        message.channel.send("There is already a welcome channel set which is "+ channel.toString() + ". Do you want to change it? Say `y` as a yes or `n` as a no.").then(c => {
          let filter = m => m.author.id === message.author.id;
          message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(collected => {
            if(collected.first().content === "y") {
              message.channel.send(`Type channel name please. No mention. or it will not working and will be cancelled.`).then(() => {
                message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(col => {
                  if(col.first().content) {
                    let ch = message.guild.channels.find(r => r.name === col.first().content);
                    if(ch) {
                      let newDoc = new welcome({
                        _id: new mongoose.Types.ObjectId(),
                        name: 'welcome',
                        guildid: message.guild.id,
                        channel: ch.id
                      });
                      welcome.deleteOne({name: "welcome", guildid: message.guild.id}).catch(console.error);
                      newDoc.save().catch(console.error);
                      return message.channel.send(`Saved ${ch.toString()} as welcome channel!`);
                    }else{
                      return message.channel.send(`Invalid channel name. Try again. Canceling command`);
                    }
                  }
                }).catch(() => {
                  message.channel.send(`Something unexpected happened. Cancelling command. Try again!`);
                })
              });
            }
            if(collected.first().content === "n") {
              return message.channel.send(`Alright. Cancelling command`);
            }
          }).catch(() => {
            message.channel.send(`Looks like your afk Use command again!`)
          })
        });
      }
    });
  }
}