module.exports = {
  help: {
    name: "nowplaying",
    category: "music",
    description: "Pause the music!",
    aliases: ["np"],
    Usage: "nowplaying"
  },
    run: async (client, message, args, prefix, ops) => {
        let fetched = ops.active.get(message.guild.id);
        if(!fetched)
            return message.channel.send("There isn't any music playing in this guild!");
            
        let queue = fetched.queue;
        let nowPlaying = queue[0];
    
        let resp = `__**Now playing**__\n**${nowPlaying.songTitle}** -- Requested by **${nowPlaying.requester}**`;
        message.channel.send(resp);    
    }
}