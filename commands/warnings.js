const config = require("./../config.json");
const mongoose = require("mongoose");
const Product = require("./../mongodb/warn");
const { RichEmbed} = require("discord.js");
const moment = require("moment");
module.exports.run = async (client, message, args, prefix) => {
  if (
    !message.member.hasPermission("ADMINISTRATOR") &&
    !config.testers.includes(message.author.id)
  ) {
    return message.channel.send("You got no permission");
  }
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!member) {
    return message.channel.send(
      `You must mention someone to check the warnings`
    );
  }
  Product.find({
    name: "Warnings",
    guildid: message.guild.id,
    userid: member.id
  }).then(async result => {
    if(!result[0] || result == []) return message.channel.send(`This user has no warnings.`)
    let warnings;
    if (!result[0]) warnings = [];
    if (result[0]) warnings = result[0].warnings;
    let warner;
    if(!result[0]) warner = [];
    if(result[0]) warner = result[0].warner
    let desc = `This user has ${result[0].warnings.length} warnings: \n`
    for (var i = 0; i < result[0].warnings.length; i++) {
			let w = result[0].warnings[i];
      desc+=`${i}) - ${moment(w.time).format("D MMM YYYY, h:mm a")} - **Reason:** ${w.reason} - **Warner:** ${w.warner} \n `
      
    } 
    const embed = new RichEmbed() 
			.setAuthor(`${member.user.tag}'s Warnings`, member.displayAvatarURL)
			.setDescription("These are all of the warnings which have been issued to this user.")
			.setColor("#9500d6")
      .setDescription(desc)
      .setFooter(client.config.footer, client.user.avatarURL)
      message.channel.send(embed); 
   /* message.channel.send(
      `${member.displayName} has ${
        warnings.length
      } warnings: \`\`\` ${warnings.join("\n")}\`\`\``
    ); */
  });
}

module.exports.help = {
  name: "warnings",
  category: "Moderation",
  description: "Check a user's warnings",
  Usage: "warnings <user tag or user id>"
}