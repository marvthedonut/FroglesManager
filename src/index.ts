import { Client, GatewayIntentBits } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";
import { Event } from "./events/Event.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const eventsPath = new URL("events/", import.meta.url);

// Event registration

fs.readdirSync(eventsPath).filter(f => f.endsWith(".js") && ![ "EventManager.js", "Event.js" ].includes(f)).forEach(async eventFile => {
	let eventClass: Event = new (await import(path.join(eventsPath.toString(), eventFile))).default();
	client.on(eventClass.type, eventClass.once)
});

client.login(process.env.TOKEN);
