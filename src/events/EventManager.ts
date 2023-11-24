import { Client } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import { Event } from "./types/Event.js";

export default class EventManager {
    private static filesIgnored = ["EventManager.js", "Event.js"];

    public static registerEvents = (client: Client) => {
        const eventsPath: URL = new URL(".", import.meta.url);

        fs.readdirSync(eventsPath)
            .filter((f: string) => f.endsWith(".js") && !this.filesIgnored.includes(f))
            .forEach(async (eventFile: string) => {
                let eventClass: Event = new (await import(path.join(eventsPath.toString(), eventFile))).default();
                client.on(eventClass.type, eventClass.once);
                console.log(`Loaded ${eventClass.id} into the event register.`);
            });
    };
}
