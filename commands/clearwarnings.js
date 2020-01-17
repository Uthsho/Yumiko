const Product = require("./../mongodb/warn.js");

module.exports.run = async (client, message, args, prefix) => {
  if (
    !message.member.hasPermission("ADMINISTRATOR")
  ) {
    return message.channel.send("You got no permission");
  }
  let member =
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!member) {
    return message.channel.send(
      `You must mention someone to clear the warnings`
    );
  }
  Product.find({
    name: "Warnings",
    guildid: message.guild.id,
    userid: member.id
  }).then(result => {
    Product.deleteOne({
      name: "Warnings",
      guildid: message.guild.id,
      userid: member.id
    }).catch(console.error);
  });
  message.channel.send(`Cleared the warnings`);
}


module.exports.help = {
  name: "clearwarnings",
  category: "Moderation",
  description: "Clear the warnings from a user",  
  Usage: "clearwarnings <mention>"
}
