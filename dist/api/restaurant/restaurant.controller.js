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
exports.removeRestaurant = exports.updateRestaurant = exports.addRestaurant = exports.getRestaurantById = exports.getRestaurants = void 0;
const logger_service_1 = require("../../services/logger.service");
const restaurant_service_1 = require("../restaurant/restaurant.service");
function getRestaurants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = typeof req.query.category === "string" ? req.query.category : "";
            const filterBy = { category };
            const restaurants = yield restaurant_service_1.restaurantService.query(filterBy);
            res.json(restaurants);
        }
        catch (err) {
            logger_service_1.logger.error("Failed to get restaurants", err);
            res.status(500).send({ err: "Failed to get restaurants" });
        }
    });
}
exports.getRestaurants = getRestaurants;
function getRestaurantById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = req.params.id;
            const restaurant = yield restaurant_service_1.restaurantService.getById(restaurantId);
            res.json(restaurant);
        }
        catch (err) {
            logger_service_1.logger.error("Failed to get restaurant", err);
            res.status(500).send({ err: "Failed to get restaurant" });
        }
    });
}
exports.getRestaurantById = getRestaurantById;
function addRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const { loggedinUser } = req;
        console.log("Test");
        try {
            const restaurant = req.body;
            const addedRestaurant = yield restaurant_service_1.restaurantService.add(restaurant);
            res.json(addedRestaurant);
        }
        catch (err) {
            logger_service_1.logger.error("Failed to add restaurant", err);
            res.status(500).send({ err: "Failed to add restaurant" });
        }
    });
}
exports.addRestaurant = addRestaurant;
function updateRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurant = req.body;
            const updatedRestaurant = yield restaurant_service_1.restaurantService.update(restaurant);
            res.json(updatedRestaurant);
        }
        catch (err) {
            logger_service_1.logger.error("Failed to update restaurant", err);
            res.status(500).send({ err: "Failed to update restaurant" });
        }
    });
}
exports.updateRestaurant = updateRestaurant;
function removeRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = req.params.id; // Assuming 'id' is a string. Adjust the type if needed.
            yield restaurant_service_1.restaurantService.remove(restaurantId);
            res.send();
        }
        catch (err) {
            logger_service_1.logger.error("Failed to remove restaurant", err);
            res.status(500).send({ err: "Failed to remove restaurant" });
        }
    });
}
exports.removeRestaurant = removeRestaurant;
