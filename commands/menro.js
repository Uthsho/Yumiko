module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You must have MANAGE_MESSAGES permission!`);
  if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("***I am missing the `MANAGE_ROLES` Permission***");
  await message.delete();
  if(!args[0]) return message.channel.send(`put a role name ¯\_(ツ)_/¯`);
  if(args[0] == "everyone") return message.channel.send(`@everyone`)
  if(args[0] == "here") return message.channel.send(`@here`)
  let role = message.guild.roles.find(r => r.name === args.join(" "));
  if(!role) return message.channel.send(`there is no role named that ¯\_(ツ)_/¯`);
  let botrole = message.guild.me.highestRole;
  if(role.position > botrole.position) return message.channel.send(`that role is higher than me`);
  await role.setMentionable(true)
  await message.channel.send(`${role.toString()}`).catch()
  await role.setMentionable(false);
}

module.exports.help = {
  name: "menro",
  category: "Moderation",
  aliases: ["mention-role", "men-role"],
  Usage: "menro <rolename> | menro here | menro everyone"
}