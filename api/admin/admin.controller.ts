import { Request, Response } from "express";
import { restaurantService } from "../restaurant/restaurant.service";
import { chefService } from "../chef/chef.service";
import { dishService } from "../dish/dish.service";
import { logger } from "../../services/logger.service";

export async function getAllData(req: Request, res: Response): Promise<void> {
    try {
        const chefs = await chefService.query();
        const dishes = await dishService.query();
        const restaurants = await restaurantService.query();
        res.json({
            data: [chefs, dishes, restaurants],
        });
    } catch (err) {
        logger.error("Failed to get AllData", err);
        res.status(500).send({ err: "Failed to get AllData" });
    }
}
export async function getChefs(req: Request, res: Response): Promise<void> {
    try {
        const chefs = await chefService.query();
        res.json({ data: chefs });
    } catch (err) {
        logger.error("Failed to get chefs", err);
        res.status(500).send({ err: "Failed to get chefs" });
    }
}
export async function getRestaurants(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const restaurants = await restaurantService.query();
        res.json({ data: restaurants });
    } catch (err) {
        logger.error("Failed to get restaurants", err);
        res.status(500).send({ err: "Failed to get restaurants" });
    }
}
export async function getDishes(req: Request, res: Response): Promise<void> {
    try {
        const dishes = await dishService.query();
        res.json({ data: dishes });
    } catch (err) {
        logger.error("Failed to get dishes", err);
        res.status(500).send({ err: "Failed to get dishes" });
    }
}
