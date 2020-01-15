module.exports.run = async(client, message, args, prefix, Discord) => {
  const embed = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setTitle(`Invite me!`)
  .setURL(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958847%60`)
  .setDescription(`[Join support server](https://discordapp.com/invite/N6Kwxd).`)
  .setFooter(client.config.footer, client.user.avatarURL)
  .setTimestamp()
  .setThumbnail(message.author.avatarURL)
  message.channel.send(embed);
}

module.exports.help = {
  name: "invite",
  category: "utility",
  description: "Invite the bot i guess",
  Usage: "invite"
}