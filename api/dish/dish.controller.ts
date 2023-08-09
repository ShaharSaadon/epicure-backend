import { Request, Response } from "express";
import { logger } from "../../services/logger.service";
import { dishService } from "../dish/dish.service";

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
