"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollection = void 0;
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("../config"));
const logger_service_1 = require("./logger.service");
let dbConn = null;
function getCollection(collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield connect();
            const collection = yield db.collection(collectionName);
            return collection;
        }
        catch (err) {
            logger_service_1.logger.error("Failed to get Mongo collection", err);
            throw err;
        }
    });
}
exports.getCollection = getCollection;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (dbConn)
            return dbConn;
        try {
            const client = yield mongodb_1.MongoClient.connect(config_1.default.dbURL);
            const db = client.db(config_1.default.dbName);
            dbConn = db;
            return db;
        }
        catch (err) {
            logger_service_1.logger.error("Cannot Connect to DB", err);
            throw err;
        }
    });
}
