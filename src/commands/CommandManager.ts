import { CacheType, Client, Collection, CommandInteraction, REST, Routes } from "discord.js";
import { Command } from "./Command.js";
import * as fs from "fs";
import * as path from "path";

export default class CommandManager {
    private static commands: Collection<string, Command> = new Collection();
    private static commandsIgnored: string[] = ["Command.js", "CommandManager.js"];
    private static commandsDir: URL = new URL(".", import.meta.url);

    public static registerCommand = async (commandName: string) => {
        let command: Command = new (await import(path.join(this.commandsDir.toString(), commandName))).default();
        this.commands.set(command.data.name, command);
        console.log(`Loaded ${command.data.name} into the command register.`);
    };

    public static registerCommands = async (client: Client) => {
        fs.readdirSync(this.commandsDir)
            .filter((f: string) => f.endsWith(".js") && !this.commandsIgnored.includes(f))
            .forEach((commandName: string) => this.registerCommand(commandName));
    };

    public static callCommand = async (interaction: CommandInteraction<CacheType>) => {
        this.commands.get(interaction.commandName)?.interact(interaction);
    };

    public static deployCommands = async () => {
        const commandsData = [...this.commands.values()].map((command) => command.data.toJSON());
        const rest = new REST({ version: "10" }).setToken(process.env.TOKEN as string);

        const res = await rest.put(Routes.applicationCommands("1176767417922355281"), { body: commandsData });
        console.log(`Deployed commands.`);
    };
}
