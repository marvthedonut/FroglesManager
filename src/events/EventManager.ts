import { Client } from "discord.js";
import * as path from "path";
import * as fs from "fs";
import { Event } from "./Event.js";

export default class EventManager {
	private static filesIgnored = [ "EventManager.js", "Event.js" ]
	public static registerCommands = (client: Client) => {
		const eventsPath: URL = new URL(import.meta.url.toString().slice(0, -"EventManager.js".length));

		fs.readdirSync(eventsPath).filter((f: string) => f.endsWith(".js") && !this.filesIgnored.includes(f)).forEach(async (eventFile: string) => {
			let eventClass: Event  = new (await import(path.join(eventsPath.toString(), eventFile))).default();
			client.on(eventClass.type, eventClass.once);
		});		
	}
}
