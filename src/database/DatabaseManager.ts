import { MongoClient } from "mongodb";

export class DatabaseManager {
    public static connection: MongoClient;

    public static connect = async () => {
        if (!process.env.MONGO) throw Error("Environment variable MONGO is not set.");
        this.connection = new MongoClient(process.env.MONGO);
        await this.connection.connect();
        console.log("Connected to database");
    };
}
