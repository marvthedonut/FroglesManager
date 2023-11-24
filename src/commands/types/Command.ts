import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
    data: SlashCommandBuilder;
    interact(interaction: CommandInteraction): Promise<void> | void;
}
