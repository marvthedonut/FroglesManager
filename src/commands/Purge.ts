import { CacheType, CommandInteraction, PermissionsBitField, SlashCommandBuilder, TextChannel } from "discord.js";
import { Command } from "./types/Command.js";

export default class Purge implements Command {
    public data: any = new SlashCommandBuilder()
        .setName("purge")
        .setDescription("Bulk delete messages")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
        .addNumberOption((builder) =>
            builder
                .setMinValue(1)
                .setMaxValue(99)
                .setName("amount")
                .setDescription("Amount of messages to delete")
                .setRequired(true),
        );

    public interact = (interaction: CommandInteraction<CacheType>) => {
        if (interaction.channel?.isTextBased) {
            (<TextChannel>interaction.channel).bulkDelete(<number>interaction.options.get("amount")?.value).then(() => {
                interaction.reply({ content: "Done!", ephemeral: true });
            });
        }
    };
}
