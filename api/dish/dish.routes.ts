import * as express from "express";
import {
    getDishes,
    getDishById,
    // addRestaurant,
    // updateRestaurant,
    // removeRestaurant
} from "./dish.controller";

const router = express.Router();

router.get("/", getDishes);
router.get("/:id", getDishById);

// router.post("/",  addDish);
// router.put("/:id",  updateDish);
// router.delete("/:id",  removeDish);

export default router;
