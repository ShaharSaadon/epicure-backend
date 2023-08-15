import express, { Express } from "express";
import http, { Server } from "http";
import { logger } from "./services/logger.service";
import * as dotenv from "dotenv";
import * as path from "path";
import * as mongoose from "mongoose";
import apiRoutes from "./routes";
import cookieParser from "cookie-parser";
// import cors from "cors";

const cors = require("cors");
const app: Express = express();

const port: string | number = process.env.PORT || 3030;
const ATLAS_URL = process.env.ATLAS_URL!;
const server: Server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());

dotenv.config();

if (process.env.NODE_ENV === "production") {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, "public")));
} else {
    const corsOptions = {
        origin: [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:4000",
            "http://127.0.0.1:3000",
            "http://localhost:3000",
            "http://localhost:4200",
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    };
    app.use(cors(corsOptions));
}

app.use("/api/v1/", apiRoutes);

mongoose
    .connect(ATLAS_URL, {})
    .then(() => {
        server.listen(port, () => {
            logger.info("Server is running on port: " + port);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
    });
