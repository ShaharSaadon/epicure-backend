import express, { Express } from "express";
import http, { Server } from "http";
import { logger } from "./services/logger.service";
import * as dotenv from "dotenv";
import * as path from "path";
import * as mongoose from "mongoose";
import apiRoutes from "./routes";
import cookieParser from "cookie-parser";
// import cors from "cors";
dotenv.config();

const cors = require("cors");
const app: Express = express();

const port: string | number = process.env.PORT || 3030;
const ATLAS_URL = process.env.ATLAS_URL!;
const server: Server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());

// if (process.env.NODE_ENV === "production") {
//     // Express serve static files on production environment
//     app.use(express.static(path.resolve(__dirname, "public")));
// } else {
const corsOptions = {
    // origin: [
    //     "http://ec2-13-49-244-35.eu-north-1.compute.amazonaws.com/",
    //     "http://ec2-13-49-244-35.eu-north-1.compute.amazonaws.com",
    //     "http://ec2-13-49-244-35.eu-north-1.compute.amazonaws.com:4000",
    //     "http://ec2-13-49-244-35.eu-north-1.compute.amazonaws.com:4000/api/v1/auth/login",
    //     "http://localhost:5173",
    //     "http://127.0.0.1:5173",
    //     "http://localhost:4000",
    //     "http://127.0.0.1:3000",
    //     "http://localhost:3000",
    //     "http://localhost:4200",
    // ],
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
// }

app.options("*", (req, res) => {
    res.header(
        "Access-Control-Allow-Origin",
        "http://ec2-13-49-244-35.eu-north-1.compute.amazonaws.com"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.send(200);
});

app.use("/api/v1/", apiRoutes);

mongoose
    .connect(ATLAS_URL, {})
    .then(() => {
        server.listen(port, () => {
            logger.info("Server is running on port: " + port);
        });
    })
    .catch((err: any) => {
        console.error("Failed to connect to MongoDB:", err);
    });
