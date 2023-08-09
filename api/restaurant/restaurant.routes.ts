import * as express from "express";
import {
    getRestaurants,
    getRestaurantById,
    addRestaurant,
    updateRestaurant,
    removeRestaurant,
} from "./restaurant.controller";

const router = express.Router();

router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);

router.post("/", addRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", removeRestaurant);

export default router;
