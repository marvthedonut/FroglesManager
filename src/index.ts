import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import EventManager from "./events/EventManager.js";
import CommandManager from "./commands/CommandManager.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

EventManager.registerEvents(client);
CommandManager.registerCommands(client);

client.login(process.env.TOKEN);
