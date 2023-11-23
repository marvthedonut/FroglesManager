import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import EventManager from "./events/EventManager.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

EventManager.registerEvents(client);

client.login(process.env.TOKEN);
