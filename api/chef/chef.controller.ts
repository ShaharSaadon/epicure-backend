import { Request, Response } from "express";
import { chefService } from "./chef.service";
import { logger } from "../../services/logger.service";
import { ObjectId } from "mongodb";

export interface IChef {
    _id?: ObjectId;
    name: string;
    image: string;
    description: string;
    restaurants: ObjectId[];
    restaurants_names: string[];
}

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
export async function addChef(req: Request, res: Response): Promise<void> {
    try {
        const chef: IChef = req.body;
        const addedChef = await chefService.add(chef);
        res.json("addedChef");
    } catch (err) {
        logger.error("Failed to add chef", err);
        res.status(500).send({ err: "Failed to add chef" });
    }
}
export async function updateChef(req: Request, res: Response): Promise<void> {
    try {
        const chef: IChef = req.body;
        const updatedChef = await chefService.update(chef);
        res.json(updatedChef);
    } catch (err) {
        logger.error("Failed to update chef", err);
        res.status(500).send({ err: "Failed to update chef" });
    }
}
export async function removeChef(req: Request, res: Response): Promise<void> {
    try {
        console.log("delete");
        const chefId: string = req.params.id; // Assuming 'id' is a string. Adjust the type if needed.
        await chefService.remove(chefId);
        res.send();
    } catch (err) {
        logger.error("Failed to remove chef", err);
        res.status(500).send({ err: "Failed to remove chef" });
    }
}
