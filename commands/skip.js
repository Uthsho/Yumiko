module.exports = {
    name: "skip",
    category: "music",
    description: "Skip a music :D",
    aliases: ['s'],
    Usage: "skip",
    run: async (client, message, args, prefix, ops) => {
      let fetched = ops.active.get(message.guild.id);
      
      if(!fetched) return message.channel.send("There isn't any music playing in this guild!");
        
      if(!message.member.voiceChannel) return message.channel.send("You are not in a voice channel");
      
      let perm = message.guild.roles.find(r => r.name === "DJ");
      let user = message.guild.member(message.author);
      if(message.member.voiceChannel.members.size > 0) {
        if(perm) {
        if(!user.roles.has(perm.id)) {
        }else{
          message.channel.send("Successfully skipped song!");
          return fetched.dispatcher.emit("end")
        }
        }else{
          if(!message.member.hasPermission("MANAGE_GUILD")) { 
            return message.channel.send(`You must have a role called **DJ** or must have **MANAGE_SERVER** permission or be in a channel with only you!`); 
          }else{
            message.channel.send("Successfully skipped song!");
            return fetched.dispatcher.emit("end")
          }
        }
      }else{
        message.channel.send("Successfully skipped song!");
        return fetched.dispatcher.emit("end");
      }
    }
}