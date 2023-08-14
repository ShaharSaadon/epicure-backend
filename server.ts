import express, { Express } from "express";
import http, { Server } from "http";
import { logger } from "./services/logger.service";
import * as dotenv from "dotenv";
import * as path from "path";
import * as mongoose from "mongoose";
dotenv.config();

const cors = require("cors");
const app: Express = express();
const server: Server = http.createServer(app);
app.use(express.json());
const port: string | number = process.env.PORT || 3030;

if (process.env.NODE_ENV === "production") {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, "public")));
} else {
    // Configuring CORS
    const corsOptions = {
        // Make sure origin contains the url your frontend is running on
        origin: [
            "http://127.0.0.1:5173",
            "http://localhost:5173",
            "http://127.0.0.1:3000",
            "http://localhost:3000",
            "http://localhost:4200",
        ],
        credentials: true,
    };
    app.use(cors(corsOptions));
}

import restaurantRoutes from "./api/restaurant/restaurant.routes";
import dishRoutes from "./api/dish/dish.routes";
import chefRoutes from "./api/chef/chef.routes";
import authRoutes from "./api/auth/auth.routes";

app.use("/api/restaurant", restaurantRoutes);
app.use("/api/chef", chefRoutes);
app.use("/api/dish", dishRoutes);
app.use("/api/auth", authRoutes);

const ATLAS_URL = process.env.ATLAS_URL || "3030";

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
