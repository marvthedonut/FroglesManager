import { Events } from "discord.js";
import CommandManager from "../commands/CommandManager.js";
import { Event } from "./types/Event.js";

export default class ReadyEvent implements Event {
    public id: string = "ready";
    public type: string = Events.ClientReady;

    public once = () => {
        console.log("Logged into discord");
        CommandManager.deployCommands();
    };
}
