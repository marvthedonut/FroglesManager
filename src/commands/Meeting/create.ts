import { CacheType, CommandInteraction, SlashCommandSubcommandBuilder } from "discord.js";
import { SubCommand } from "../types/SubCommand.js";

export default class MeetingCreate implements SubCommand {
    public data: SlashCommandSubcommandBuilder = new SlashCommandSubcommandBuilder()
        .setName("create")
        .setDescription("Create meeting");
    public interact = (interaction: CommandInteraction<CacheType>) => {
        throw new Error("Method not implemented.");
    };
}
