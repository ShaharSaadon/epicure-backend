import * as express from "express";
import {
    getDishes,
    getDishById,
    // addDish,
    // updateDish,
    // removeDish
} from "./dish.controller";

const router = express.Router();

router.get("/", getDishes);
router.get("/:id", getDishById);

// router.post("/",  addDish);
// router.put("/:id",  updateDish);
// router.delete("/:id",  removeDish);

export default router;
