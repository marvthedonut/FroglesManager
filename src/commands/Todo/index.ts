import { SlashCommandBuilder } from "discord.js";
import { SubCommandGroup } from "../types/SubCommandGroup.js";

export default class Todo implements SubCommandGroup {
    public data: SlashCommandBuilder = new SlashCommandBuilder().setName("todo").setDescription("Todo module");
}
