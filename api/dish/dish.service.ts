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
            signature: true,
        };

        const collection: Collection<any> = await dbService.getCollection(
            "dish"
        );
        const dishes: any[] = await collection.find(criteria).toArray();
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

export const dishService = {
    query,
    getById,
};
