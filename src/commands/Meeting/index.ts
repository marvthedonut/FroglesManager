import { SlashCommandBuilder } from "discord.js";
import { SubCommandGroup } from "../types/SubCommandGroup.js";

export default class Meeting implements SubCommandGroup {
    public data: SlashCommandBuilder = new SlashCommandBuilder().setName("meeting").setDescription("Test");
}
