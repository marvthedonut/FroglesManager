import { CommandInteraction, SlashCommandSubcommandBuilder } from "discord.js";

export interface SubCommand {
    data: SlashCommandSubcommandBuilder;
    interact(interaction: CommandInteraction): Promise<void> | void;
}
