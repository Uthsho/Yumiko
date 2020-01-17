const {RichEmbed} = require("discord.js");
module.exports.run = async(client, message, args, prefix) => {
  let modemoji = client.emojis.get("665470661212504067");
  let utilityemoji = client.emojis.get("665472081995235328");
  let updateemoji = client.emojis.get("665473108865712128");
  let funemoji = client.emojis.get("666243933352755211");
  let CustomEmoji = client.emojis.get("666972618649501706");
  let AntiEmoji = client.emojis.get("667009272554586128");
  let shortcut = client.emojis.get("667011161039831100");
  let backup = client.emojis.get("667021584887971880");
  if(!args[0]) {
    const all = new RichEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
    .setColor("RANDOM")
    .setThumbnail(message.guild.iconURL)
    .setDescription("Prefix is `" + prefix + "`, Use "+ prefix + "help <cmd> below for info!")
    .addField(modemoji + " Moderation - (16)", "`config`, `embed`, `announce`, `warn`, `warnings`, `menro`,  `setprefix`, `poll`, \n `kick`, `ban`, `role`, `purge`, `avatar`, `lockdown`, `swear`, \n `setwelcome`, `removewelcome`, `testjoin`", true)
    .addField(utilityemoji + " Utility - (6)", "`ping`, `snipe`, `help`, `suggest`, `invite`, `botinfo`", true)
    .addField(funemoji + " Fun - (1)", "`hastebin`", true)
    .addField(CustomEmoji + " Custom Command/Reponse - (2)", "`addcustomcommand`, `removecustomcommand`", true)
    .addField(AntiEmoji + " Anti Commands - (1)", "`swear`", true)
    .addField(backup + " Backup - (1)", "`backup`", true)
    .addField(shortcut + " Shortcut - (8)", "`mention-role`, `av`, `addcc`, `removecc`, `prefix`, `sprefix`, `userinfo`, `info`", true)
    .addField(`Note`, `If backup command doesn't work report to the staff team immediately to reenable it again!`)
    .addField(`${updateemoji} Update:`, `Made a anti-swear system!. Made a custom command/response system!. Made a config command to see server config. Made a backup command. Added welcome feature! \n SneakPeak: Working on a rpg system!`)
    .addField("\u200b", `[SUPPORT](https://discord.gg/6ScVS4V) - [INVITE](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958847%60) - [REPO](${client.config.repo})`)
    .setImage(`https://cdn.discordapp.com/attachments/480226524860121088/480754721263452178/Gate_Banner.png&size=50`)
    .setTimestamp()
    .setFooter(client.config.footer, client.user.avatarURL)
    message.channel.send(all).then(c => {
      message.channel.send(`Note: This bot is a beta version and is constantly being programmed. So if you use this bot you will see it turn offline/stop while you're using commands.`)
    })
  }else{
    getCMD(client, message, args[0], prefix)
  }
  function getCMD(client, message, input, prefix) {
    const embed = new RichEmbed();
    const command = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()))
    let cmd = command.help
    
    let info = `No information found for command **${input.toLowerCase()}**`;

  // If no cmd is found, send not found embed
  if (!cmd) {
    return message.channel.send(embed.setColor("RED").setDescription(info));
  }

  // Add all cmd info to the embed
  if (cmd.name) info = `**name**: ${prefix}${cmd.name}`;
  if(cmd.category) info += `\n**Category**: ${cmd.category}`;
  if (cmd.aliases)
    info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${prefix}${a}\``).join(", ")}`;
  if (cmd.description) info += `\n**Description**: ${cmd.description}`;
  if (cmd.Usage) {
    info += `\n**Usage**: ${cmd.Usage}`;
  }

  return message.channel.send(embed.setFooter(`Syntax: <> = required, [] = optional`).setColor("RANDOM").setDescription(info).setThumbnail(client.user.avatarURL));
  }
}

module.exports.help = {
  name: "help",
  category: "utility",
  description: "Get help",
  Usage: "help"
}