const swear = require("./../mongodb/swear");
const mongoose = require("mongoose")
module.exports.run = async(client, message, args, prefix, Discord) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`You need Administrator permission!`)
  if(!args[0]) return message.channel.send(`Invalid message statement`);
  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setFooter(client.config.footer, client.user.avatarURL)
  .setThumbnail(message.guild.iconURL)
  .setTimestamp()
  swear.findOne({name: "swear", serverid: message.guild.id}).then(result => {
    if(!result || result == []) {
      if(args[0] == "enable") {
        if(args[1]) {
          let eh = []
          let extra = args.slice(1).forEach(r => {
            eh.push(r)
          });
          let newDoc = new swear({
            _id: new mongoose.Types.ObjectId,
            name: "swear",
            serverid: message.guild.id,
            e: "enable",
            extra: eh
          });
          newDoc.save().catch(r => console.log(r));
          embed.setDescription(`Enabled it. With extra swear words.`)
          message.channel.send(embed);
        }else{
          let newDoc = new swear({
            _id: new mongoose.Types.ObjectId,
            name: "swear",
            serverid: message.guild.id,
            e: "enable",
          });
          newDoc.save().catch(r => console.log(r));
          embed.setDescription(`Enabled it.`)
          message.channel.send(embed);
        }
      }
      if(args[0] == "extra") {
        message.channel.send(`First enable it`);
      }
      if(args[0] == "disable") {
        message.channel.send(`It is already disabled`);
      }
    }else{
      if(args[0] == "enable") {
        message.channel.send(`Its Already enabled -_-`);
      }
      if(args[0] == "extra") {
        if(result.extra){ var old = result.extra ? result.extra : [] } else { var old = [] };
        let ah = args.slice(1).forEach(r => {
          old.push(r);
        });
        let duck = new swear({
            _id: new mongoose.Types.ObjectId,
            name: "swear",
            serverid: message.guild.id,
            e: "enable",
            extra: old
          });
        swear.deleteOne({name: "swear", serverid: message.guild.id}).catch(console.error);
        duck.save().catch(console.error);
        embed.setDescription(`Added the custom words!`);
        
      }
      if(args[0] == "disable") {
        if(result.e == "disable") return message.channel.send(`It's already disabled!`)
        if(!result.extra == []) {
        let newDoc = new swear({
          _id: new mongoose.Types.ObjectId(),
          name: 'sweat',
          serverid: message.guild.id,
          e: "disable",
          extra: result.extra
        });
        swear.deleteOne({name: 'swear', serverid: message.guild.id}).then(console.error);
        newDoc.save().catch(console.error);
        embed.setDescription(`Disabled it!`);
        message.channel.send(embed);
        }else{
          let newDoc = new swear({
          _id: new mongoose.Types.ObjectId(),
          name: 'sweat',
          serverid: message.guild.id,
          e: "disable",
        });
        swear.delete({name: 'swear', serverid: message.guild.id}).then(console.error);
        newDoc.save().catch(console.error);
        embed.setDescription(`Disabled it!`);
        message.channel.send(embed);
        }
      }
      if(args[0] == "remove") {
        let desc = `Choose one of them from ${result.extra.length} of them \n`;
        let ah = result.extra;
        for(var i = 0; i < ah.length; i++) {
      let w = ah[i];
      desc+=`${i} - w \n`;
    }
    embed.setDescription(desc);
    message.channel.send(embed).then(c => {
      const filter = m => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(async collected => {
      let re = collected.first().content
      let no = parseInt(re);
      if(no === "0") {
        if(!no) return message.channel.send(`Looks like you didn't type a valid number try again!`);
        swear.deleteOne({name: "swear", serverid: message.guild.id}).catch(console.error)
        message.channel.send(`Removed ${ah[no].name} from the database`);
      }else{
      if(!ah[no]) return message.channel.send(`There is no number like that.`);
      message.channel.send(`Removed ${ah[no]} from the database`);
      ah.splice(no, 1)
      let newDoc = new swear({
        _id: new mongoose.Types.ObjectId(),
        name: 'swear',
        serverid: message.guild.id,
        e: "enable",
        extra: ah
      });
      swear.deleteOne({name: "swear", serverid: message.guild.id}).catch(console.error)
      if(ah.length === 0) {
        let duck = new swear({
          _id: new mongoose.Types.ObjectId(),
          name: 'swear',
          serverid: message.guild.id,
          e: "enable"
        });
        return duck.save().catch(console.error);
      }
      newDoc.save().catch(console.error);
      }
    }).catch(err => {
      message.channel.send(`Looks like you're afk. Use command again.`)
    })
    })
      }
      }
                                     
  });
}

module.exports.help = {
  name: "swear",
  category: "Moderation",
  description: "Enable/disable the feature. You can also add custom words to blacklist from your server!",
  Usage: "swear enable [custom words] || swear disable || swear extra <custom words>"
}