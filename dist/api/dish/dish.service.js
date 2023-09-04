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
exports.dishService = void 0;
const mongodb_1 = require("mongodb");
const dbService = require("../../services/db.service");
const logger_service_1 = require("../../services/logger.service");
function query(filterBy = { txt: "" }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const criteria = {
            //     name: { $regex: filterBy.txt, $options: "i" },
            //     signature: true,
            // };
            const collection = yield dbService.getCollection("dish");
            const dishes = yield collection.find().toArray();
            return dishes;
        }
        catch (err) {
            logger_service_1.logger.error("cannot find dishes", err);
            throw err;
        }
    });
}
function getById(dishId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService.getCollection("dish");
            const dish = yield collection.findOne({
                _id: new mongodb_1.ObjectId(dishId),
            });
            return dish;
        }
        catch (err) {
            logger_service_1.logger.error(`while finding dish ${dishId}`, err);
            throw err;
        }
    });
}
function remove(dishId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService.getCollection("dish");
            yield collection.deleteOne({ _id: new mongodb_1.ObjectId(dishId) });
        }
        catch (err) {
            logger_service_1.logger.error(`cannot remove dish ${dishId}`, err);
            throw err;
        }
    });
}
function update(dish) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dishToSave = {
                name: dish.name,
                special: dish.special,
                ingredients: dish.ingredients,
                price: dish.price,
                restaurantId: dish.restaurantId,
                dishType: dish.dishType,
            };
            const collection = yield dbService.getCollection("dish");
            yield collection.updateOne({ _id: new mongodb_1.ObjectId(dish._id) }, { $set: dishToSave });
            return dish;
        }
        catch (err) {
            logger_service_1.logger.error(`cannot update dish ${dish._id}`, err);
            throw err;
        }
    });
}
function add(dish) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService.getCollection("dish");
            yield collection.insertOne(dish);
            return dish;
        }
        catch (err) {
            logger_service_1.logger.error("cannot insert dish", err);
            throw err;
        }
    });
}
exports.dishService = {
    query,
    getById,
    update,
    add,
    remove,
};
