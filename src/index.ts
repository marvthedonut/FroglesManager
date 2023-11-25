import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import CommandManager from "./commands/CommandManager.js";
import EventManager from "./events/EventManager.js";
import { DatabaseManager } from "./database/DatabaseManager.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

EventManager.registerEvents(client);
CommandManager.registerCommands(client);

(async () => {
    await DatabaseManager.connect();
    client.login(process.env.TOKEN);
})();
