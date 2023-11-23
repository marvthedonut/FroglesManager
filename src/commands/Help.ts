import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "./Command.js";

export default class Help implements Command {
    public data: SlashCommandBuilder = new SlashCommandBuilder()
        .setName("help")
        .setDescription("List all commands, description, and usage.");
    public interact = (interaction: CommandInteraction) => {
        interaction.reply("Test");
    };
}
