module.exports.run = async(client, message, args) => {
  if(!message.guild.id === "666252866993782812") return;
  let role = message.guild.roles.find(r => r.name === "Members");
  let member = message.guild.members.get(message.author.id);
  if(!member.roles.has(role.id)) {
    member.addRole(role)
    message.channel.send(`Verified You!`)
  }else{
    message.channel.send(`You already verified because you have the role!`);
  }
}