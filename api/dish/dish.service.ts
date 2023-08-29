import { Collection, ObjectId, Db } from "mongodb";
const dbService = require("../../services/db.service");
import { logger } from "../../services/logger.service";

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

interface FilterBy {
    txt: string;
}
async function query(filterBy: FilterBy = { txt: "" }): Promise<any[]> {
    try {
        // const criteria = {
        //     name: { $regex: filterBy.txt, $options: "i" },
        //     signature: true,
        // };

        const collection: Collection<any> = await dbService.getCollection(
            "dish"
        );
        const dishes: any[] = await collection.find().toArray();
        return dishes;
    } catch (err) {
        logger.error("cannot find dishes", err);
        throw err;
    }
}
async function getById(dishId: string): Promise<any> {
    try {
        const collection = await dbService.getCollection("dish");
        const dish = await collection.findOne({
            _id: new ObjectId(dishId),
        });
        return dish;
    } catch (err) {
        logger.error(`while finding dish ${dishId}`, err);
        throw err;
    }
}
async function remove(dishId: string): Promise<void> {
    try {
        const collection = await dbService.getCollection("dish");
        await collection.deleteOne({ _id: new ObjectId(dishId) });
    } catch (err) {
        logger.error(`cannot remove dish ${dishId}`, err);
        throw err;
    }
}
async function update(dish: Dish): Promise<Dish> {
    try {
        const dishToSave = {
            name: dish.name,
            special: dish.special,
            ingredients: dish.ingredients,
            price: dish.price,
            restaurantId: dish.restaurantId,
            dishType: dish.dishType,
        };

        const collection = await dbService.getCollection("dish");
        await collection.updateOne(
            { _id: new ObjectId(dish._id) },
            { $set: dishToSave }
        );
        return dish;
    } catch (err) {
        logger.error(`cannot update dish ${dish._id}`, err);
        throw err;
    }
}
async function add(dish: Dish): Promise<Dish> {
    try {
        const collection = await dbService.getCollection("dish");
        await collection.insertOne(dish);
        return dish;
    } catch (err) {
        logger.error("cannot insert dish", err);
        throw err;
    }
}

export const dishService = {
    query,
    getById,
    update,
    add,
    remove,
};
