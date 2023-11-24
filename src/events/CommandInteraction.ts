import { Events, Interaction } from "discord.js";
import CommandManager from "../commands/CommandManager.js";
import { Event } from "./types/Event.js";

export default class _CommandInteraction implements Event {
    public id: string = "command_interaction";
    public type: string = Events.InteractionCreate;

    public once = (interaction: Interaction) => {
        if (interaction.isCommand()) {
            console.log(`${interaction.user.tag} just used ${interaction.commandName}.`);
            CommandManager.callCommand(interaction);
        }
    };
}
