import * as dotenv from "dotenv";
dotenv.config();

export const dbURL: string = process.env.ATLAS_URL || "";
export const dbName: string = process.env.DB_NAME || "";
