import express, { Express } from "express";
import http, { Server } from "http";
import { logger } from "./services/logger.service";

const app: Express = express();
const server: Server = http.createServer(app);
app.use(express.json());
const port: string | number = process.env.PORT || 3030;

logger.info("Hi", 90, "Bobo");

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
