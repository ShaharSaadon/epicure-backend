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
exports.getDishes = exports.getRestaurants = exports.getChefs = exports.getAllData = void 0;
const restaurant_service_1 = require("../restaurant/restaurant.service");
const chef_service_1 = require("../chef/chef.service");
const dish_service_1 = require("../dish/dish.service");
const logger_service_1 = require("../../services/logger.service");
function getAllData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chefs = yield chef_service_1.chefService.query();
            const dishes = yield dish_service_1.dishService.query();
            const restaurants = yield restaurant_service_1.restaurantService.query();
            res.json({
                data: [chefs, dishes, restaurants],
            });
        }
        catch (err) {
            logger_service_1.logger.error("Failed to get AllData", err);
            res.status(500).send({ err: "Failed to get AllData" });
        }
    });
}
exports.getAllData = getAllData;
function getChefs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chefs = yield chef_service_1.chefService.query();
            res.json({ data: chefs });
        }
        catch (err) {
            logger_service_1.logger.error("Failed to get chefs", err);
            res.status(500).send({ err: "Failed to get chefs" });
        }
    });
}
exports.getChefs = getChefs;
function getRestaurants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurants = yield restaurant_service_1.restaurantService.query();
            res.json({ data: restaurants });
        }
        catch (err) {
            logger_service_1.logger.error("Failed to get restaurants", err);
            res.status(500).send({ err: "Failed to get restaurants" });
        }
    });
}
exports.getRestaurants = getRestaurants;
function getDishes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dishes = yield dish_service_1.dishService.query();
            res.json({ data: dishes });
        }
        catch (err) {
            logger_service_1.logger.error("Failed to get dishes", err);
            res.status(500).send({ err: "Failed to get dishes" });
        }
    });
}
exports.getDishes = getDishes;
