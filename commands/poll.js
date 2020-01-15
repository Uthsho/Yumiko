const Discord = require("discord.js");
module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You need BAN permission`)
  if(!args[0]) return message.channel.send(`You want me to find a channel with no name? -_-`);
  let channel = message.mentions.channels.first() || client.channels.get(args[0]);
  if(!channel) return message.channel.send(`Invalid channel mention or id`);
  if(!args[1]) return message.channel.send(`A poll with no question? Type a question -_-`);
  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setFooter(client.config.footer, client.user.avatarURL)
  .setTimestamp()
  .setDescription(args.slice(1).join(" "))
  .setThumbnail(message.guild.iconURL)
  message.channel.send(`You want to mention here/everyone? Type "everyone" for everyone or "here" for here or "n" for none. You havce 60 second to choose.`).then(() => {
    const filter = m => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(async collected => {
      if(collected.first().content === "everyone") {
        let c = await channel.send(embed);
        c.react("👍")
        c.react("👎")
        channel.send(`@everyone`)
      }
      if(collected.first().content === "here") {
        let c = await channel.send(embed);
        c.react("👍")
        c.react("👎")
        channel.send(`@here`)
      }
      if(collected.first().content === "n") {
        channel.send(embed).then(c => {
          c.react("👍");
          c.react("👎");
        });
      }
    }).catch(() => {
      message.channel.send(`Looks like you're afk. Use command again.`)
    })

  })
}

module.exports.help = {
  name: "poll",
  category: "Moderation",
  description: "Make a poll",
  Usage: "poll <channel id or mention> <question>"
}