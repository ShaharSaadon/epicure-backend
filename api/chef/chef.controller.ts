import { Request, Response } from "express";
import { logger } from "../../services/logger.service";
import { chefService } from "./chef.service";

export async function getChefs(req: Request, res: Response): Promise<void> {
    try {
        const chefs = await chefService.query();
        res.json(chefs);
    } catch (err) {
        logger.error("Failed to get chefs", err);
        res.status(500).send({ err: "Failed to get chefs" });
    }
}
export async function getChefById(req: Request, res: Response): Promise<void> {
    try {
        const chefId = req.params.id;
        const chef = await chefService.getById(chefId);
        res.json(chef);
    } catch (err) {
        logger.error("Failed to get chef", err);
        res.status(500).send({ err: "Failed to get chef" });
    }
}
