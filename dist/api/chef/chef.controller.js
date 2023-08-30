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
exports.removeChef = exports.updateChef = exports.addChef = exports.getChefById = exports.getChefs = void 0;
const chef_service_1 = require("./chef.service");
const logger_service_1 = require("../../services/logger.service");
function getChefs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chefs = yield chef_service_1.chefService.query();
            res.json(chefs);
        }
        catch (err) {
            logger_service_1.logger.error("Failed to get chefs", err);
            res.status(500).send({ err: "Failed to get chefs" });
        }
    });
}
exports.getChefs = getChefs;
function getChefById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chefId = req.params.id;
            const chef = yield chef_service_1.chefService.getById(chefId);
            res.json(chef);
        }
        catch (err) {
            logger_service_1.logger.error("Failed to get chef", err);
            res.status(500).send({ err: "Failed to get chef" });
        }
    });
}
exports.getChefById = getChefById;
function addChef(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chef = req.body;
            const addedChef = yield chef_service_1.chefService.add(chef);
            res.json("addedChef");
        }
        catch (err) {
            logger_service_1.logger.error("Failed to add chef", err);
            res.status(500).send({ err: "Failed to add chef" });
        }
    });
}
exports.addChef = addChef;
function updateChef(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chef = req.body;
            const updatedChef = yield chef_service_1.chefService.update(chef);
            res.json(updatedChef);
        }
        catch (err) {
            logger_service_1.logger.error("Failed to update chef", err);
            res.status(500).send({ err: "Failed to update chef" });
        }
    });
}
exports.updateChef = updateChef;
function removeChef(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("delete");
            const chefId = req.params.id; // Assuming 'id' is a string. Adjust the type if needed.
            yield chef_service_1.chefService.remove(chefId);
            res.send();
        }
        catch (err) {
            logger_service_1.logger.error("Failed to remove chef", err);
            res.status(500).send({ err: "Failed to remove chef" });
        }
    });
}
exports.removeChef = removeChef;
