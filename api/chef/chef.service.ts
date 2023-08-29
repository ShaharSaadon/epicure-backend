import { Collection, ObjectId, Db } from "mongodb";
import * as dbService from "../../services/db.service";
import { logger } from "../../services/logger.service";

export interface IChef {
    _id?: ObjectId;
    name: string;
    image: string;
    description: string;
    restaurants: ObjectId[];
    restaurants_names: string[];
}

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

async function add(chef: IChef): Promise<IChef> {
    try {
        const collection = await dbService.getCollection("chef");
        await collection.insertOne(chef);
        return chef;
    } catch (err) {
        logger.error("cannot insert chef", err);
        throw err;
    }
}

async function remove(chefId: string): Promise<void> {
    try {
        const collection = await dbService.getCollection("chef");
        await collection.deleteOne({ _id: new ObjectId(chefId) });
    } catch (err) {
        logger.error(`cannot remove chef ${chefId}`, err);
        throw err;
    }
}
async function update(chef: IChef): Promise<IChef> {
    try {
        const chefToSave = {
            name: chef.name,
            image: chef.image,
            description: chef.description,
            restaurants: chef.restaurants,
        };
        const collection = await dbService.getCollection("chef");
        await collection.updateOne(
            { _id: new ObjectId(chef._id) },
            { $set: chefToSave }
        );
        return chef;
    } catch (err) {
        logger.error(`cannot update chef ${chef._id}`, err);
        throw err;
    }
}

export const chefService = {
    query,
    getById,
    add,
    update,
    remove,
};
