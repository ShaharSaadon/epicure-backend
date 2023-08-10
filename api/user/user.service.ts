import { ObjectId, Collection, Document } from "mongodb";
import * as dbService from "../../services/db.service";
import { logger } from "../../services/logger.service";

type WithId<T> = T & { _id: ObjectId };

import { User } from "../auth/auth.service";
interface FilterBy {
    txt?: string;
    minBalance?: number;
}

async function query(filterBy: FilterBy = {}): Promise<WithId<User>[]> {
    const criteria = _buildCriteria(filterBy);
    try {
        const collection = await dbService.getCollection("user");
        const users = (await collection
            .find(criteria)
            .sort({ nickname: -1 })
            .toArray()) as WithId<User>[];
        return users.map((user) => {
            delete user.password;
            user.createdAt = new ObjectId(user._id).getTimestamp();
            return user;
        });
    } catch (err) {
        logger.error("cannot find users", err);
        throw err;
    }
}

async function getById(userId: string): Promise<User | null> {
    try {
        const collection = await dbService.getCollection("user");
        const user = (await collection.findOne({
            _id: new ObjectId(userId),
        })) as User | null;
        if (user) delete user.password;
        return user;
    } catch (err) {
        logger.error(`while finding user ${userId}`, err);
        throw err;
    }
}

async function getByUsername(username: string): Promise<User | null> {
    try {
        const collection = await dbService.getCollection("user");
        const user = (await collection.findOne({ username })) as User | null;
        return user;
    } catch (err) {
        logger.error(`while finding user ${username}`, err);
        throw err;
    }
}

async function remove(userId: string): Promise<void> {
    try {
        const collection = await dbService.getCollection("user");
        await collection.deleteOne({ _id: new ObjectId(userId) });
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err);
        throw err;
    }
}
async function update(user: User): Promise<User> {
    const userToSave = {
        _id: new ObjectId(user._id!),
        username: user.username,
        fullname: user.fullname,
    };

    try {
        const collection: Collection<Document> = await dbService.getCollection(
            "user"
        );
        await collection.updateOne(
            { _id: userToSave._id },
            { $set: userToSave }
        );
        const updatedUser = (await collection.findOne({
            _id: userToSave._id,
        })) as unknown as User;
        return updatedUser;
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err);
        throw err;
    }
}

async function add(user: User): Promise<User> {
    try {
        if (!user.username) throw new Error("Username is missing");
        const existUser = await getByUsername(user.username);
        if (existUser) throw new Error("Username taken");

        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
        };
        const collection = await dbService.getCollection("user");
        await collection.insertOne(userToAdd);
        return userToAdd;
    } catch (err) {
        logger.error("cannot insert user", err);
        throw err;
    }
}

function _buildCriteria(filterBy: FilterBy): any {
    const criteria: any = {};
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: "i" };
        criteria.$or = [
            {
                username: txtCriteria,
            },
            {
                fullname: txtCriteria,
            },
        ];
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance };
    }
    return criteria;
}

export const userService = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
};
