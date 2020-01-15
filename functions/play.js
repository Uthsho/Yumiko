module.exports = async function(client, ops, data) {
  data.dispatcher = await data.connections.playStream()
}