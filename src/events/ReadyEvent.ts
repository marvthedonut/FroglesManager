import { Events } from "discord.js";
import { Event } from "./Event.js"

export default class ReadyEvent implements Event {
	public id: string = "ready";
	public type: string = Events.ClientReady;
	public once = () => {
		console.log("Logged into discord");
	}
}
