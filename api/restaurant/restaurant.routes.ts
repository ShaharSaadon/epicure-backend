import * as express from "express";
import {
    getRestaurants,
    getRestaurantById,
    // Uncomment any other functions you need
    // addRestaurant,
    // updateRestaurant,
    // removeRestaurant
} from "./restaurant.controller";

const router = express.Router();

router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);

// Uncomment these if you need them
// router.post("/",  addRestaurant);
// router.put("/:id",  updateRestaurant);
// router.delete("/:id",  removeRestaurant);

export default router;
