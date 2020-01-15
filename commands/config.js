const cc = require("./../mongodb/cc");
const swear = require("./../mongodb/swear");
const Discord = require("discord.js");

module.exports.run = async(client, message, args, prefix) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`You must have ADMINISTRATOR permission`);
  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setThumbnail(message.guild.iconURL)
  .setFooter(client.config.footer, client.user.avatarURL)
  .setTimestamp()
  .setColor("RANDOM")
  let CustomEmoji = client.emojis.get("666972618649501706");
  let SwearEmoji = client.emojis.get("666973200868966422");
  let PrefixEmoji = client.emojis.get("666976963885268992");
  cc.findOne({name: "cc", serverid: message.guild.id}).then(res => {
    swear.findOne({name: 'swear', serverid: message.guild.id}).then(result => {
      if(result) {
        embed.addField(`${SwearEmoji} Anti-Swear`, `Enabled`, true);
        if(!result.extra == [] || !result.extra == "enable") {
        if(message.channel.nsfw === true) {
          embed.addField(`${SwearEmoji}Custom Swear words`, result.extra.map(r => `||${r}||`).join("\n"), true);
        }else{
          embed.addField(`${SwearEmoji} Custom Swear Words`, `Can be viewable in a nsfw channel!`, true);
        }
        }else{
          embed.addField(`${SwearEmoji} Custom Swear Words`, `None set. Use ${prefix}swear enable <swear words>.`, true);
        }
      }else{
        embed.addField(`${SwearEmoji} Anti-Swear`, `Disabled`, true);
        embed.addField(`${SwearEmoji} Custom Swear Words`, `None set. Use ${prefix}swear enable <swear words>.`, true);
      }
      if(res) {
        if(!res.commands == []) {
          embed.addField(`${CustomEmoji} Custom Command/Response`, res.commands.map(r => `name: ${r.name}, \n response: ${r.response} \n`, true));
        }else{
          embed.addField(`${CustomEmoji} Custom Command/Response`, `None set!`, true);
        }
      }else{
        embed.addField(`${CustomEmoji} Custom Command/Response`, `None set!`, true);
      }
      embed.addField(`${PrefixEmoji} Prefix`, prefix, true);
      message.channel.send(embed);
    });
  });
}

module.exports.help = {
  name: "config",
  category: "Moderation",
  description: "Check server config",
  Usage: "config"
}