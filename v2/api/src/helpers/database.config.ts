import { ServerApiVersion } from "mongodb";

export const databaseConfig = {
    connectTimeoutMS: 30000,
    serverApi: ServerApiVersion.v1,
};