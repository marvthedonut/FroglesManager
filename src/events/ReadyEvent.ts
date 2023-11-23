import { Events } from "discord.js";
import EventType from "./EventType"

export default class ReadyEvent implements EventType {
	public id: string = "ready";
	public type: string = Events.ClientReady;
	public once = () => {
		console.log("Logged into discord");
	}
}
