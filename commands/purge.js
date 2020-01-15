module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(" You do not have sufficient permissions to purge messages.");
  if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(" I do not have sufficient permissions to manage messages.");
  if(isNaN(args[0])) return message.channel.send(" Supply an number please");
  if (args[0] > 100) return message.channel.send(" I can't purge more than 100 messages.");
  message.delete().then(() => {
  message.channel.bulkDelete(args[0]);
  message.channel.send("Successfully deleted " + args[0] + " messages.").then(c => {
    c.delete(10000);
  })
  });
}

module.exports.help = {
  name: "purge",
  category: "Moderation",
  description: "Purge messages",
  Usage: "purge <amount>"
}