import { Request, Response } from "express";
import { logger } from "../../services/logger.service";
import { restaurantService } from "../restaurant/restaurant.service";

export async function getRestaurants(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const txt = typeof req.query.txt === "string" ? req.query.txt : "";
        const filterBy = { txt };

        logger.debug("Getting Restaurants", filterBy);
        const restaurants = await restaurantService.query(filterBy);
        res.json(restaurants);
    } catch (err) {
        logger.error("Failed to get restaurants", err);
        res.status(500).send({ err: "Failed to get restaurants" });
    }
}
export async function getRestaurantById(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const restaurantId = req.params.id;
        const restaurant = await restaurantService.getById(restaurantId);
        res.json(restaurant);
    } catch (err) {
        logger.error("Failed to get restaurant", err);
        res.status(500).send({ err: "Failed to get restaurant" });
    }
}
