const Discord = require("discord.js");
const user = require("./../mongodb/profile.js");
const mongoose = require("mongoose")
module.exports.run = async(client, message, args) => {
  let loading = client.emojis.get("657469976663293952");
  let success = client.emojis.get("657464234816438304");
  user.findOne({name: "profile", userid: message.author.id}).then(result => {
    if(!result || result == []) {
      message.channel.send(`You do not have a profile created.`).then(c => {
        setTimeout(() => {
          c.edit(`${loading} Creating a profile ${loading}.`)
        }, 3000);
        setTimeout(() => {
          let newDoc = new user({
            _id: new mongoose.Types.ObjectId(),
            userid: message.author.id,
            money: "0",
          })
          newDoc.save().catch(() => {})
          c.delete(1000)
          message.channel.send(`${success} Successfully created your profile`)
        }, 6000)
      })
    }else{
      let ilogo = client.emojis.get("665893082063044658");
      let plogo = client.emojis.get("665890603124654119");
      let yc = client.emojis.get("665806654146609223");
      let badge = client.emojis.get("665880305319673857");
      let embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setTitle(`Profile`)
      .setFooter(client.config.footer, client.user.avatarURL)
      .setThumbnail(message.author.avatarURL)
      .setDescription(`Currency: ${yc}`)
      .setColor("RANDOM")
      console.log(result)
      if(result.money) {
        embed.addField(`${yc}`, result.money, true);
      }
      if(!result.badges || !result.badges === []) {
      
      }else{
        embed.addField(`${badge} Badges:`, `${result.badges.map((r) => `Name - ${r.name}. \n Given by - ${r.giver} \n`).join("\n")}`, true)
      }
      if(!result.pets || !result.pets === []) {
      }else{
        embed.addField(`${plogo} Pets`, `${result.pets.map(r => `-------------------- \n name: ${client.emojis.get(r.logo)} ${r.name}:- \n rarity: ${r.rarity} \n -------------------- \n`).join("\n")}`, true);
      }
      if(result.items || !result.items === []) {
        
      }else{
        embed.addField(`${ilogo} Items`, `${result.items.map(r => `-------------------- \n name: ${r.name} \n type: ${r.type} \n -------------------- \n`).join("\n")}`, true)

      }
      message.channel.send(embed);
    }
  })
}

module.exports.help = {
  name: "profile",
  category: "Economy",
  description: "Check your profile",
  Usage: "profile",
  aliases: ["pf"]
}