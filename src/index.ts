import { Client, GatewayIntentBits } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";
import EventType from "./events/EventType";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const eventsPath = path.join(__dirname, "events");

// Event registration

fs.readdirSync(eventsPath).filter(f => f.endsWith(".js") && f != "EventType.js").forEach(eventFile => {
	let eventClass: EventType = new (require(path.join(eventsPath, eventFile))).default();
	client.on(eventClass.type, eventClass.once)
});

client.login(process.env.TOKEN);
