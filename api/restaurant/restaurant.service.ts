import { Collection, ObjectId, Db } from "mongodb";
const dbService = require("../../services/db.service");
import { logger } from "../../services/logger.service";

interface FilterBy {
    txt: string;
}

async function query(filterBy: FilterBy = { txt: "" }): Promise<any[]> {
    try {
        console.log("service");
        const criteria = {
            name: { $regex: filterBy.txt, $options: "i" },
        };

        const collection: Collection<any> = await dbService.getCollection(
            "restaurant"
        );
        const restaurants: any[] = await collection.find().toArray();
        console.log(restaurants);
        return restaurants;
    } catch (err) {
        logger.error("cannot find restaurants", err);
        throw err;
    }
}

async function getById(restaurantId: string): Promise<any> {
    try {
        const collection = await dbService.getCollection("restaurant"); // Assuming dbService is properly typed
        const restaurant = await collection.findOne({
            _id: new ObjectId(restaurantId),
        }); // Adding 'await' here to ensure the result is correctly awaited
        return restaurant;
    } catch (err) {
        logger.error(`while finding restaurant ${restaurantId}`, err);
        throw err;
    }
}

export const restaurantService = {
    query,
    getById,
};
