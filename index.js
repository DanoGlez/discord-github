const fs = require("fs");
const path = require("path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildIntegrations,
],
});

require("./deploy-commands").deploy();

client.commands = new Collection();

const loadCommands = (directory) => {
  const commandFiles = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of commandFiles) {
    const filePath = path.join(directory, file.name);

    if (file.isDirectory()) {
      loadCommands(filePath);
    } else if (file.isFile() && file.name.endsWith(".js")) {
      const command = require(filePath);

      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.warn(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }
};

const commandsPath = path.join(__dirname, "commands");
loadCommands(commandsPath);

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env["DISCORD_TOKEN"]);
