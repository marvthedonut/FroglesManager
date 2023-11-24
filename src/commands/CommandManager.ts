import {
    CacheType,
    ChatInputCommandInteraction,
    Client,
    Collection,
    CommandInteraction,
    REST,
    Routes,
} from "discord.js";
import * as fs from "fs";
import * as path from "path";
import { Command } from "./types/Command.js";
import { SubCommand } from "./types/SubCommand.js";
import { SubCommandGroup } from "./types/SubCommandGroup.js";

export default class CommandManager {
    private static commands: Collection<string, Command | SubCommand | SubCommandGroup> = new Collection();
    private static commandsIgnored: string[] = ["types", "CommandManager.js"];
    private static commandsDir: URL = new URL(".", import.meta.url);

    public static registerCommand = async (commandName: string) => {
        let command: Command = new (await import(path.join(this.commandsDir.toString(), commandName))).default();
        this.commands.set(command.data.name, command);

        console.log(`Loaded ${command.data.name} into the command register.`);
    };

    public static registerCommands = async (client: Client) => {
        let dir = fs.readdirSync(this.commandsDir);

        dir.filter((f: string) => f.endsWith(".js") && !this.commandsIgnored.includes(f)).forEach(
            (commandName: string) => {
                console.log(commandName);
                this.registerCommand(commandName);
            },
        );

        dir.filter((f: string) => !f.endsWith(".js") && !this.commandsIgnored.includes(f)).forEach(
            async (groupName: string) => {
                let groupDirPath = new URL(`./${groupName}`, import.meta.url);

                let groupDir = fs.readdirSync(groupDirPath);
                let groupData: SubCommandGroup = new (
                    await import(path.join(groupDirPath.toString(), "index.js"))
                ).default();

                groupDir
                    .filter((f) => f != "index.js")
                    .forEach(async (f: string) => {
                        let subcommand = new (await import(path.join(groupDirPath.toString(), f))).default();

                        groupData.data.addSubcommand(subcommand.data);
                        this.commands.set(`${groupData.data.name}-_${subcommand.data.name}`, subcommand);
                        console.log(`Loaded ${groupData.data.name}-_${subcommand.data.name} in command register.`);
                    });

                this.commands.set(groupData.data.name, groupData);
                console.log(`Loaded ${groupData.data.name} in command register.`);
            },
        );
    };

    public static callCommand = async (interaction: CommandInteraction<CacheType>) => {
        let subcommand = (<ChatInputCommandInteraction>interaction).options.getSubcommand(false);
        let commandClass = this.commands.get(interaction.commandName + (subcommand ? "-_" + subcommand : ""));
        // @ts-ignore
        commandClass?.interact(interaction);
    };

    public static deployCommands = async () => {
        const commandsData = [...this.commands.entries()]
            .filter((f) => !f[0].includes("-_"))
            .map((command) => {
                return command[1].data.toJSON();
            });
        const rest = new REST().setToken(process.env.TOKEN as string);

        const res = await rest.put(Routes.applicationCommands("1176767417922355281"), { body: commandsData });
        console.log(`Deployed commands.`);
    };

    public static getCommands = () => {
        return this.commands.clone();
    };
}
