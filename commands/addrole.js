module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`You need Manage_roles permission`);
  if(!args[0]) return message.channel.send(`A role with no name? Great`);
  message.guild.createRole({
    name: args.join(" ")
  }).then(c => {
    message.channel.send(`Successfully created ${c.name}.`)
  })
  
}

module.exports.help = {
  name: "addrole",
  category: "Moderation",
  description: "Create a role",
  Usage: "addrole <name>"
}