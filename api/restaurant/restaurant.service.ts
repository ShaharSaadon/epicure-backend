import { Collection, ObjectId, Db } from "mongodb";
const dbService = require("../../services/db.service");
import { logger } from "../../services/logger.service";
import * as mongoose from "mongoose";

export interface Restaurant {
    _id: string;
    type: "restaurant";
    name: string;
    chefId: ObjectId;
    stars: number;
    openHoures: string[];
    dishes?: Dish[];
    faundationDate: Date;
}
export interface Dish {
    _id: String;
    type: "dish";
    name: string;
    special?: string;
    ingredients: string;
    price?: number;
    restaurantId: string;
    dishType?: string;
}

interface FilterBy {
    category: string;
}

async function query(filterBy: FilterBy = { category: "" }): Promise<any[]> {
    let criteria = {};

    switch (filterBy.category) {
        case "NEW":
            const currentYear = new Date().getFullYear();
            const startDate = `${currentYear}-01-01`;
            const endDate = `${currentYear}-12-31`;
            criteria = {
                faundationDate: {
                    $gte: startDate,
                    $lte: endDate,
                },
            };
            logger.debug(`NEW filter criteria:`, criteria);
            break;
        case "MOST_POPULAR":
            criteria = { stars: { $gte: 4 } };
            break;
    }

    const collection: Collection<any> = await dbService.getCollection(
        "restaurant"
    );
    const pipeline = [
        { $match: criteria },
        {
            $lookup: {
                from: "dish",
                localField: "dishes",
                foreignField: "_id",
                as: "dishes",
            },
        },
        {
            $lookup: {
                from: "chef",
                localField: "chefId",
                foreignField: "_id",
                as: "chef",
            },
        },
        {
            $unwind: {
                path: "$chef",
                preserveNullAndEmptyArrays: true,
            },
        },
    ];

    const restaurants: any[] = await collection.aggregate(pipeline).toArray();
    logger.debug(
        `Found ${restaurants.length} restaurants for category ${filterBy.category}`
    );
    return restaurants;
}
async function getById(restaurantId: string): Promise<any> {
    try {
        const collection = await dbService.getCollection("restaurant");

        const pipeline = [
            { $match: { _id: new ObjectId(restaurantId) } },
            {
                $addFields: {
                    // Convert dishes array from string to ObjectID
                    dishes: {
                        $map: {
                            input: "$dishes",
                            as: "dish",
                            in: { $toObjectId: "$$dish" },
                        },
                    },
                    chef: "$chef",
                },
            },
            {
                $lookup: {
                    from: "dish",
                    localField: "dishes",
                    foreignField: "_id",
                    as: "dishes",
                },
            },
            {
                $lookup: {
                    from: "chef",
                    localField: "chefId",
                    foreignField: "_id",
                    as: "chef",
                },
            },
            {
                $unwind: {
                    path: "$chef",
                    preserveNullAndEmptyArrays: true,
                },
            },
        ];

        const restaurant = await collection.aggregate(pipeline).next();
        console.log(restaurant);
        return restaurant;
    } catch (err) {
        logger.error(`while finding restaurant ${restaurantId}`, err);
        throw err;
    }
}
async function remove(restaurantId: string): Promise<void> {
    try {
        const collection = await dbService.getCollection("restaurant");
        await collection.deleteOne({ _id: new ObjectId(restaurantId) });
    } catch (err) {
        logger.error(`cannot remove restaurant ${restaurantId}`, err);
        throw err;
    }
}
async function update(restaurant: Restaurant): Promise<Restaurant> {
    try {
        const restaurantToSave = {
            name: restaurant.name,
            chefId: new mongoose.Types.ObjectId(restaurant.chefId),
            stars: restaurant.stars,
            openHoures: restaurant.openHoures,
            dishes: restaurant.dishes,
            faundationDate: restaurant.faundationDate,
        };
        console.log(restaurantToSave);
        const collection = await dbService.getCollection("restaurant");
        await collection.updateOne(
            { _id: new ObjectId(restaurant._id) },
            { $set: restaurantToSave }
        );
        return restaurant;
    } catch (err) {
        logger.error(`cannot update restaurant ${restaurant._id}`, err);
        throw err;
    }
}
async function add(restaurant: Restaurant): Promise<Restaurant> {
    try {
        const collection = await dbService.getCollection("restaurant");
        await collection.insertOne(restaurant);
        return restaurant;
    } catch (err) {
        logger.error("cannot insert restaurant", err);
        throw err;
    }
}
export const restaurantService = {
    query,
    getById,
    remove,
    update,
    add,
};
