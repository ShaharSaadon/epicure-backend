"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const logger_service_1 = require("./services/logger.service");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const mongoose = __importStar(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import cors from "cors";
dotenv.config();
const cors = require("cors");
const app = (0, express_1.default)();
const port = process.env.PORT || 3030;
const ATLAS_URL = process.env.ATLAS_URL;
const server = http_1.default.createServer(app);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
if (process.env.NODE_ENV === "production") {
    // Express serve static files on production environment
    app.use(express_1.default.static(path.resolve(__dirname, "public")));
}
else {
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
app.use("/api/v1/", routes_1.default);
mongoose
    .connect(ATLAS_URL, {})
    .then(() => {
    server.listen(port, () => {
        logger_service_1.logger.info("Server is running on port: " + port);
    });
})
    .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
});
