import { Request, Response } from "express";
import { logger } from "../../services/logger.service";
import { restaurantService } from "../restaurant/restaurant.service";
export interface Restaurant {
    _id: string;
    type: "restaurant";
    name: string;
    chef?: string;
    stars: number;
    openHoures: string[];
    dishes?: Dish[];
    faundationDate: Date;
}
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
export async function getRestaurants(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const category =
            typeof req.query.category === "string" ? req.query.category : "";
        const filterBy = { category };

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
        console.log("restaurantId=", restaurantId);
        const restaurant = await restaurantService.getById(restaurantId);
        console.log("restaurant=", restaurant);
        res.json(restaurant);
    } catch (err) {
        logger.error("Failed to get restaurant", err);
        res.status(500).send({ err: "Failed to get restaurant" });
    }
}
export async function addRestaurant(
    req: Request,
    res: Response
): Promise<void> {
    // const { loggedinUser } = req;

    try {
        const restaurant: Restaurant = req.body;
        const addedRestaurant = await restaurantService.add(restaurant);
        res.json(addedRestaurant);
    } catch (err) {
        logger.error("Failed to add restaurant", err);
        res.status(500).send({ err: "Failed to add restaurant" });
    }
}
export async function updateRestaurant(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const restaurant: Restaurant = req.body;
        const updatedRestaurant = await restaurantService.update(restaurant);
        res.json(updatedRestaurant);
    } catch (err) {
        logger.error("Failed to update restaurant", err);
        res.status(500).send({ err: "Failed to update restaurant" });
    }
}
export async function removeRestaurant(
    req: Request,
    res: Response
): Promise<void> {
    try {
        console.log("hola");
        const restaurantId: string = req.params.id; // Assuming 'id' is a string. Adjust the type if needed.
        await restaurantService.remove(restaurantId);
        res.send();
    } catch (err) {
        logger.error("Failed to remove restaurant", err);
        res.status(500).send({ err: "Failed to remove restaurant" });
    }
}
