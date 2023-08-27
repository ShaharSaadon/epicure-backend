"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantService = void 0;
const mongodb_1 = require("mongodb");
const dbService = require("../../services/db.service");
const logger_service_1 = require("../../services/logger.service");
function query(filterBy = { category: "" }) {
    return __awaiter(this, void 0, void 0, function* () {
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
                logger_service_1.logger.debug(`NEW filter criteria:`, criteria);
                break;
            case "MOST_POPULAR":
                criteria = { stars: { $gte: 4 } };
                break;
        }
        const collection = yield dbService.getCollection("restaurant");
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
        ];
        const restaurants = yield collection.aggregate(pipeline).toArray();
        logger_service_1.logger.debug(`Found ${restaurants.length} restaurants for category ${filterBy.category}`);
        return restaurants;
    });
}
function getById(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService.getCollection("restaurant");
            const pipeline = [
                { $match: { _id: new mongodb_1.ObjectId(restaurantId) } },
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
            ];
            const restaurant = yield collection.aggregate(pipeline).next();
            return restaurant;
        }
        catch (err) {
            logger_service_1.logger.error(`while finding restaurant ${restaurantId}`, err);
            throw err;
        }
    });
}
function remove(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService.getCollection("restaurant");
            yield collection.deleteOne({ _id: new mongodb_1.ObjectId(restaurantId) });
        }
        catch (err) {
            logger_service_1.logger.error(`cannot remove restaurant ${restaurantId}`, err);
            throw err;
        }
    });
}
function update(restaurant) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantToSave = {
                name: restaurant.name,
                chefId: restaurant.chefId,
                stars: restaurant.stars,
                openHoures: restaurant.openHoures,
                dishes: restaurant.dishes,
                faundationDate: restaurant.faundationDate,
            };
            const collection = yield dbService.getCollection("restaurant");
            yield collection.updateOne({ _id: new mongodb_1.ObjectId(restaurant._id) }, { $set: restaurantToSave });
            return restaurant;
        }
        catch (err) {
            logger_service_1.logger.error(`cannot update restaurant ${restaurant._id}`, err);
            throw err;
        }
    });
}
function add(restaurant) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService.getCollection("restaurant");
            yield collection.insertOne(restaurant);
            return restaurant;
        }
        catch (err) {
            logger_service_1.logger.error("cannot insert restaurant", err);
            throw err;
        }
    });
}
exports.restaurantService = {
    query,
    getById,
    remove,
    update,
    add,
};
