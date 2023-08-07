import express, { Express } from "express";
import http, { Server } from "http";
import { logger } from "./services/logger.service";
import * as path from "path";
const cors = require("cors");
console.log("Environment PORT:", process.env.PORT);

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
        ],
        credentials: true,
    };
    app.use(cors(corsOptions));
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

logger.info("Hi", 90, "Bobo");

import restaurantRoutes from "./api/restaurant/restaurant.routes";
app.use("/api/restaurant", restaurantRoutes);

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
