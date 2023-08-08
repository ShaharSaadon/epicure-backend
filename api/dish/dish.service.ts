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
            "dish"
        );
        const dishs: any[] = await collection.find().toArray();
        console.log(dishs);
        return dishs;
    } catch (err) {
        logger.error("cannot find dishs", err);
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
