const config = require("./../config.json");
const mongoose = require("mongoose");
const Product = require("./../mongodb/warn");

module.exports.run = async(client, message, args) => {
  if (
    !message.member.hasPermission("ADMINISTRATOR") &&
    !config.testers.includes(message.author.id)
  ) {
    return message.channel.send("You got no permission");
  }
  let member =
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!member) {
    return message.channel.send(`You must mention someone to warn`);
  }
  if(member.hasPermission("ADMINISTRATOR")) return message.reply(`This user is immune for warns`);
  Product.find({
    name: "Warnings",
    guildid: message.guild.id,
    userid: member.id
  }).then(result => {
    var reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason Given";
    var format = {
      warner: message.author.tag,
      reason: reason,
      time: new Date()
    }
    if(result[0]){ var warnings = result[0].warnings ? result[0].warnings : [] } else { var warnings = [] };
    warnings.push(format);
    var duck = new Product({
      _id: new mongoose.Types.ObjectId(), // new mongoose.Types.ObjectId() always generates a unique id in the mongoose.Schema.Types.ObjectId format
      guildid: message.guild.id,
      name: "Warnings",
      userid: member.id,
      warner: message.author.tag,
      warnings: warnings
    });
    member
      .send("You have been warned for reason: " + reason + ". By Mod/Admin: " + message.author.tag)
      .catch(error =>
        message.reply(
          `Sorry ${message.author} I couldn't warn because of : ${error}`
        )
      );
    message.channel.send(
      `${member.user.tag} has been warned by ${message.author.tag} because: ${reason}`
    );
    message.react("👌");
    if (!result || result == []) {
      duck.save().catch(console.error);
    } else {
      Product.deleteOne({
        name: "Warnings",
        guildid: message.guild.id,
        userid: member.id
      }).catch(console.error);

      duck.save().catch(console.error);
    }
  });
}

module.exports.help = {
  name: "warn",
  category: "Moderation",
  description: "Warn a user",
  Usage: "warn <user tag or user id> [reason]"
}