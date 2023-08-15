import { Request, Response } from "express";
import { logger } from "../../services/logger.service";
import { chefService } from "../chef/chef.service";
import { restaurantService } from "../restaurant/restaurant.service";
import { dishService } from "../dish/dish.service";

export async function getAllData(req: Request, res: Response): Promise<void> {
    try {
        const chefs = await chefService.query();
        const dishes = await dishService.query();
        const restaurants = await restaurantService.query();
        res.json([chefs, dishes, restaurants]);
    } catch (err) {
        logger.error("Failed to get AllData", err);
        res.status(500).send({ err: "Failed to get AllData" });
    }
}
