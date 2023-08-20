import { Collection, ObjectId, Db } from "mongodb";
import * as dbService from "../../services/db.service";
import { logger } from "../../services/logger.service";

async function query(): Promise<any[]> {
    try {
        const collection: Collection<any> = await dbService.getCollection(
            "chef"
        );

        // Aggregation pipeline
        const pipeline = [
            {
                $lookup: {
                    from: "restaurant", // Assuming the restaurant collection is named "restaurant"
                    localField: "restaurants", // Field in the chef collection
                    foreignField: "_id", // Field in the restaurant collection
                    as: "restaurants", // Output array field
                },
            },
        ];

        const chefs: any[] = await collection.aggregate(pipeline).toArray();
        return chefs;
    } catch (err) {
        logger.error("cannot find chefs", err);
        throw err;
    }
}

async function getById(chefId: string): Promise<any> {
    try {
        const collection = await dbService.getCollection("chef");

        // Aggregation pipeline
        const pipeline = [
            {
                $match: { _id: new ObjectId(chefId) }, // Filter by chefId
            },
            {
                $lookup: {
                    from: "restaurant", // Assuming the restaurant collection is named "restaurant"
                    localField: "restaurant", // Field in the chef collection
                    foreignField: "_id", // Field in the restaurant collection
                    as: "restaurants", // Output array field
                },
            },
        ];

        const chefs = await collection.aggregate(pipeline).toArray();
        if (chefs.length) return chefs[0]; // Return the first chef (since IDs are unique)
        return null; // If no chef found
    } catch (err) {
        logger.error(`while finding chef ${chefId}`, err);
        throw err;
    }
}

export const chefService = {
    query,
    getById,
};
