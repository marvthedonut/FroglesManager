import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "./Command.js";
import CommandManager from "./CommandManager.js";

export default class Help implements Command {
    public data: SlashCommandBuilder = new SlashCommandBuilder()
        .setName("help")
        .setDescription("List all commands, description, and usage.");

    public interact = (interaction: CommandInteraction) => {
        let description: string[] = [];
        const commands = CommandManager.getCommands();

        commands.forEach((command) => {
            description.push("**/" + command.data.name + "**");
            description.push(command.data.description);
            description.push("");
        });

        let em = new EmbedBuilder()
            .setColor(Colors.Green)
            .setTitle("Commands")
            .setFooter({
                text: "Requested by " + interaction.user.displayName,
                iconURL: <string>interaction.user.avatarURL(),
            })
            .setTimestamp()
            .setDescription(description.join("\n"));

        interaction.reply({ embeds: [em] });
    };
}
