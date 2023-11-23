import { CacheType, Events, Interaction, CommandInteraction } from "discord.js";
import { Event } from "./Event.js";
import CommandManager from "../commands/CommandManager.js";

export default class _CommandInteraction implements Event {
    public id: string = "command_interaction";
    public type: string = Events.InteractionCreate;
    public once = (interaction: Interaction) => {
        if (interaction.isCommand()) {
            CommandManager.callCommand(interaction as CommandInteraction<CacheType>);
        }
    };
}
