module.exports.run = async(client, message, args) => {
  let msg = await message.channel.send(`If you can see this the bot is slow or the discord api is slow`);
  msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
};

module.exports.help = {
  name: "ping",
  category: "utility",
  description: "See bot's ping i guess",
  Usage: "ping"
}