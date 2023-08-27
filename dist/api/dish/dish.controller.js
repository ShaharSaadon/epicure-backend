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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDishById = exports.getDishes = void 0;
const logger_service_1 = require("../../services/logger.service");
const dish_service_1 = require("../dish/dish.service");
function getDishes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const txt = typeof req.query.txt === "string" ? req.query.txt : "";
            const filterBy = { txt };
            const dishs = yield dish_service_1.dishService.query(filterBy);
            res.json(dishs);
        }
        catch (err) {
            logger_service_1.logger.error("Failed to get dishes", err);
            res.status(500).send({ err: "Failed to get dishs" });
        }
    });
}
exports.getDishes = getDishes;
function getDishById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dishId = req.params.id;
            const dish = yield dish_service_1.dishService.getById(dishId);
            res.json(dish);
        }
        catch (err) {
            logger_service_1.logger.error("Failed to get dish", err);
            res.status(500).send({ err: "Failed to get dish" });
        }
    });
}
exports.getDishById = getDishById;
