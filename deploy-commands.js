const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = [];

const loadCommands = (directory) => {
  const commandFiles = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of commandFiles) {
    const filePath = path.join(directory, file.name);

    if (file.isDirectory()) {
      // Si es una carpeta, llama recursivamente a loadCommands
      loadCommands(filePath);
    } else if (file.isFile() && file.name.endsWith(".js")) {
      // Si es un archivo JavaScript, intenta cargarlo como un comando
      const command = require(filePath);
      if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
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

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env["DISCORD_TOKEN"]);

module.exports.deploy = async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    if (process.env["NODE_ENV"] === "production") {
      // En producción, registra todos los comandos para tu aplicación
      const data = await rest.put(
        Routes.applicationCommands(process.env["DISCORD_CLIENT_ID"]),
        { body: commands }
      );

      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } else {
      // En desarrollo, registra todos los comandos en un servidor de desarrollo
      const data = await rest.put(
        Routes.applicationGuildCommands(
          process.env["DISCORD_CLIENT_ID"],
          process.env["DISCORD_DEV_SERVER_ID"]
        ),
        { body: commands }
      );

      console.log(
        `Successfully reloaded ${data.length} application (/) commands on dev guild.`
      );
    }
  } catch (error) {
    console.error(error);
  }
};
