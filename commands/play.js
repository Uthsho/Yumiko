const ytdl = require("ytdl-core");
const Discord = require("discord.js");
module.exports.run = async(client, message, args, prefix, ops) => {
    const embed = new Discord.RichEmbed()
    .setAuthor(`Music system!`, client.user.avatarURL)
    .setColor("RANDOM")
    if(!args[0]) return message.channel.send(`No Put some args first -_-`);
    
    let validate = await ytdl.validateURL(args[0]);
    
    let data = ops.active.get(message.guild.id) || {};
    
    if(!data.connection) data.connection = await message.member.voiceChannel.join();
    if(!data.queue) 
      data.queue = [];
      data.guildID = message.guild.id;
    
    if(!validate) {
      var video = await client.yt.search(args.join(" "), 1)
      let info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${video[0].id}`)
      data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: `https://www.youtube.com/watch?v=${video[0].id}`,
        announceChannel: message.channel.id
      })
      if(!data.dispatcher) {
        play(client, ops, data) 
      }else{
        message.channel.send(`Added to queue: **${info.title}** | requested by **${message.author.username}**`);
      }
    }else{
      let vid = await ytdl.getInfo(args[0])
      data.queue.push({
        songTitle: vid.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
      })
      if(!data.dispatcher) {
        play(client, ops, data)
      }else{
        message.channel.send(`Added to queue: **${vid.title}** | requested by **${message.author.username}**`);
      }
    }
    if(!data.channel) data.channel = message.channel.id;
    
    ops.active.set(message.guild.id, data);
    
    async function play(client, ops, data) {
      data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: "audioonly"}));
      
      data.dispatcher.guildID = data.guildID;
      
      data.dispatcher.setVolume(100/100);
      
      
      
      client.channels.get(data.queue[0].announceChannel).send(`:musical_note: Now Playing: ${data.queue[0].songTitle} | Requested by ${data.queue[0].requester}`);
      
      ops.active.set(data.dispatcher.guildID, data);
      data.dispatcher.once("end", function(){
        if(data.connection) {
          finish(client, ops, this)
        }
      })
    }
    
    async function finish(client, ops, dispatcher) {
      let fetched = ops.active.get(dispatcher.guildID);
      if(fetched) {
      
      let loop = client.loop.get(dispatcher.guildID);
      if(loop) {
        if(loop == "queue") {
          let lastSong = fetched.queue.shift();
          fetched.queue.push(lastSong);
          ops.active.set(dispatcher.guildID, fetched);
          play(client, ops, fetched);
          
        }
        if(loop == "single") {
          play(client, ops, fetched);
          /*fetched.dispatcher = fetched.connection.playStream(ytdl(fetched.queue[0].url, { filter: 'audioonly'}));
          ops.active.set(dispatcher.guildID, fetched);
          client.channels.get(data.queue[0].announceChannel).send(`:musical_note: Now Playing: ${data.queue[0].songTitle} | Requested by ${data.queue[0].requester}`);
          */
        }
      }else{
        fetched.queue.shift()
        if(fetched.queue.length > 0) {
          ops.active.set(dispatcher.guildID, fetched);
          play(client, ops, fetched);
        }
        else{
          let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
          if(vc) vc.leave();
          await client.channels.get(fetched.channel).send(`Leaving cause queue empty!`);
          ops.active.delete(dispatcher.guildID);
        }
      }
      }
    }
  }

module.exports.help = {
  name: "play",
  category: "Music",
  description: "Play a song by url or by searching! :))",
  aliases: ["ply", "start", "p"],
  Usage: "play <url> | play <name>"
}