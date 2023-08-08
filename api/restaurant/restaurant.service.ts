import { Collection, ObjectId, Db } from "mongodb";
const dbService = require("../../services/db.service");
import { logger } from "../../services/logger.service";

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
                $lookup: {
                    from: "dish",
                    localField: "dishes",
                    foreignField: "_id",
                    as: "dishes",
                },
            },
        ];

        const restaurant = await collection.aggregate(pipeline).next();
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
