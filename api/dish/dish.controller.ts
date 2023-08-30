import { Request, Response } from "express";
import { logger } from "../../services/logger.service";
import { dishService } from "../dish/dish.service";

export interface Dish {
    _id: string;
    type: "dish";
    name: string;
    special?: string;
    ingredients: string;
    price?: number;
    restaurantId: string;
    dishType?: string;
}

export async function getDishes(req: Request, res: Response): Promise<void> {
    try {
        const txt = typeof req.query.txt === "string" ? req.query.txt : "";
        const filterBy = { txt };
        const dishs = await dishService.query(filterBy);

        res.json(dishs);
    } catch (err) {
        logger.error("Failed to get dishes", err);
        res.status(500).send({ err: "Failed to get dishs" });
    }
}
export async function getDishById(req: Request, res: Response): Promise<void> {
    try {
        const dishId = req.params.id;
        const dish = await dishService.getById(dishId);
        res.json(dish);
    } catch (err) {
        logger.error("Failed to get dish", err);
        res.status(500).send({ err: "Failed to get dish" });
    }
}
export async function addDish(req: Request, res: Response): Promise<void> {
    console.log("Test");
    try {
        const dish: Dish = req.body;
        const addedDish = await dishService.add(dish);
        res.json(addedDish);
    } catch (err) {
        logger.error("Failed to add dish", err);
        res.status(500).send({ err: "Failed to add dish" });
    }
}
export async function updateDish(req: Request, res: Response): Promise<void> {
    try {
        const dish: Dish = req.body;
        const updatedDish = await dishService.update(dish);
        res.json(updatedDish);
    } catch (err) {
        logger.error("Failed to update dish", err);
        res.status(500).send({ err: "Failed to update dish" });
    }
}
export async function removeDish(req: Request, res: Response): Promise<void> {
    try {
        console.log("removeFromBackend");
        const dishId: string = req.params.id;
        await dishService.remove(dishId);
        res.send();
    } catch (err) {
        logger.error("Failed to remove dish", err);
        res.status(500).send({ err: "Failed to remove dish" });
    }
}
