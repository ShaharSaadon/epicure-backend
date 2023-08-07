import * as express from "express";
import {
    getCars,
    getRestaurantById,
    // Uncomment any other functions you need
    // addRestaurant,
    // updateRestaurant,
    // removeRestaurant
} from "./Restaurant.controller";

const router = express.Router();

router.get("/", getCars); // You might want to rename this to getRestaurants if that's the correct function name
router.get("/:id", getRestaurantById);

// Uncomment these if you need them
// router.post("/",  addRestaurant);
// router.put("/:id",  updateRestaurant);
// router.delete("/:id",  removeRestaurant);

export default router;
