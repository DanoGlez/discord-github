// Funcion para enviar logs
const data = require ("../data/config.json")

module.exports = {
  sendLog: async (client, message) => {
    const channel = client.channels.cache.get(data.Config.discord_log);
    if (!channel) return console.log("Log channel not found.");
    channel.send(message);
  },
  sendError: async (client, message) => {
    const channel = client.channels.cache.get(data.Config.discord_log);
    if (!channel) return console.log("Error channel not found.");
    channel.send(message);
  },
  sendWarn: async (client, message) => {
    const channel = client.channels.cache.get(data.Config.discord_log);
    if (!channel) return console.log("Warning channel not found.");
    channel.send(message);
  }
};