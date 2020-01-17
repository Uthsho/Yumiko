const giveaway = require("./../mongodb/giveaway");
const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(client, message, args) => {
  if(!args[0]) return message.channel.send(`Invalid statement!`);
  if(args[0] == "start") {
    let t = parseInt(args[1]);
    let time = ms(args[1]);
    if(!time) return message.channel.send(`Invalid time`)
    let winner = parseInt(args[2]);
    if(!winner) return message.channel.send(`Invalid number of winners`);
    let prize = args.slice(1).slice(1).slice(1).join(' ');
    message.channel.send("Do you want a requirement for giveaway?. Type `role` if you want role requirement or `server` if you want server requirement Or `n` if none.").then(c => {
      let filter = m => m.author.id === message.author.id;
      message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(collected => {
        let reply = collected.first().content;
        if(reply === "n") {
          message.channel.send(`Mention a channel where you want the giveaway running`).then(cc => {
          message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(collec => {
            if(collected.first().content) {
              console.log(collected.first().ment)
              
            }
          })/*.catch(() => {
            message.channel.send(`Looks like you're afk try again.`) 
          }) */
          })
        }
      })/*.catch(() => {
        message.channel.send(`Looks like you're afk. Use command again.`) 
      }) */
    });
  }
}