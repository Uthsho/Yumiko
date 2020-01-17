module.exports.run = async(client, message, args, prefix, ops) => {
    if(!args[0]) return message.channel.send(`type a value of either queue or single or none`);
    
    
    let fetched = ops.active.get(message.guild.id)
    if(!fetched) return message.channel.send(`There is no music running rn`);
    
    if(args[0] == "queue") {
      client.loop.set(message.guild.id, 'queue')
      message.channel.send(`Set the loop type to queue!`);
    }
    if(args[0] == "single") {
      let fetched = ops.active.get(message.guild.id);
      client.loop.set(message.guild.id, 'single')
      message.channel.send(`Set to single`)
    }
    if(args[0] == "none") {
      client.loop.delete(message.guild.id)
      message.channel.send(`Set to none!`);
    }
  }

module.exports.help = {
  ame: "loop",
  category: "music",
  description: "Loop to queue only/ single only/none",
  Usage: "loop <queue/single/none",
  aliases: ["repeat"]
}