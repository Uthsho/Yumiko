module.exports.run = async(client, message, args) => {
  if(message.content.includes("@everyone") || message.content.includes("@here")) return message.channel.send(`You cannot use me for mentioning everyone/here dummy`).then(r => r.delete(10000));
  if(!args[0]) return message.channel.send(`Can't send a empty message`).then(c => c.delete(10000));
  message.delete()
  message.channel.send(args.join(" "));
}

module.exports.help = {
  name: "say",
  category: "Utility",
  description: "make bot say something",
  Usage: "say <text>"
}