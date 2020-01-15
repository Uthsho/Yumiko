module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`:x: You must have the ***ADMINISTRATOR*** permission!`);
    
    let member = message.guild.member(message.mentions.members.first()) || message.guild.members.get(args[0]);
    
    if(!member) return message.channel.send(`Please specify a user or a id.`)
    
    let role = message.guild.roles.find(role => role.name === args.slice(1).join(" ")) || message.guild.roles.get(args.slice(1).join(" "));
    
    if(!args[1]) return message.channel.send(`Please specify a role name or a id.`)
    if(!role) return message.channel.send(`Either that role doesn't exist or you spelt it wrong.`);
    let emoji = client.emojis.get("657877908139802634")
    if(member.roles.has(role.id)) {
      member.removeRole(role)
      message.channel.send(`${emoji} Changed roles for ${member.tag || member.user.tag}, -${role.name}.`)
    }else{
    member.addRole(role)
      message.channel.send(`${emoji} Changed roles for ${member.tag || member.user.tag}, +${role.name}.`)
    }
}

module.exports.help = {
  name: "role",
  category: "Moderation",
  description: "add or remove a role from a user!",
  Usage: "role <user id or tag> <rolename>"
}