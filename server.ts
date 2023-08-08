import express, { Express } from "express";
import http, { Server } from "http";
import { logger } from "./services/logger.service";
import * as path from "path";
const cors = require("cors");
// import { Restaurant } =from "./models/restaurant";
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

logger.info("Hi", 90, "Bobo");

import restaurantRoutes from "./api/restaurant/restaurant.routes";
import dishRoutes from "./api/dish/dish.routes";

app.use("/api/restaurant", restaurantRoutes);
app.use("/api/dish", dishRoutes);

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
