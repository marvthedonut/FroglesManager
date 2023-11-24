import { CacheType, CommandInteraction, SlashCommandSubcommandBuilder } from "discord.js";
import { SubCommand } from "../types/SubCommand.js";

export default class MeetingCreate implements SubCommand {
    public data: SlashCommandSubcommandBuilder = new SlashCommandSubcommandBuilder()
        .setName("create")
        .setDescription("Create todo item");
    private messageId: string = "1177494073716785213";

    public interact = (interaction: CommandInteraction<CacheType>) => {
        interaction.reply({ content: "Shhh!", ephemeral: true });
    };
}
