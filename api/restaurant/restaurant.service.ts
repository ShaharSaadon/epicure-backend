import { Collection, ObjectId, Db } from "mongodb";
const dbService = require("../../services/db.service");
import { logger } from "../../services/logger.service";

interface FilterBy {
    txt: string;
}

async function query(filterBy: FilterBy = { txt: "" }): Promise<any[]> {
    try {
        const criteria = {
            name: { $regex: filterBy.txt, $options: "i" },
        };

        const collection: Collection<any> = await dbService.getCollection(
            "restaurant"
        );
        const restaurants: any[] = await collection.find(criteria).toArray();
        return restaurants;
    } catch (err) {
        logger.error("cannot find restaurants", err);
        throw err;
    }
}

async function getById(restaurantId: string): Promise<any> {
    try {
        const collection = await dbService.getCollection("car"); // Assuming dbService is properly typed
        const car = await collection.findOne({
            _id: new ObjectId(restaurantId),
        }); // Adding 'await' here to ensure the result is correctly awaited
        return car;
    } catch (err) {
        logger.error(`while finding car ${restaurantId}`, err);
        throw err;
    }
}
