import { Request, Response } from "express";
const logger = require("../../services/logger.service");
const restaurantService = require("./restaurant.service.js");

async function getRestaurants(req: Request, res: Response): Promise<void> {
    try {
        const filterBy = {
            txt: req.query.txt || "",
        };
        logger.debug("Getting Restaurants", filterBy);
        const restaurants = await restaurantService.query(filterBy);
        res.json(restaurants);
    } catch (err) {
        logger.error("Failed to get restaurants", err);
        res.status(500).send({ err: "Failed to get restaurants" });
    }
}

async function getRestaurantById(req: Request, res: Response): Promise<void> {
    try {
        const restaurantId = req.params.id;
        const restaurant = await restaurantService.getById(restaurantId);
        res.json(restaurant);
    } catch (err) {
        logger.error("Failed to get restaurant", err);
        res.status(500).send({ err: "Failed to get restaurant" });
    }
}

module.exports = {
    getRestaurants,
    getRestaurantById,
};
