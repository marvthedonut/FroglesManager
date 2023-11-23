import { Collection } from "discord.js";

export default class CommandManager {
	private static commands: Collection<string, any> = new Collection();
	public static registerCommand = async (commandName: string) => {
		// TODO	
	}
}
