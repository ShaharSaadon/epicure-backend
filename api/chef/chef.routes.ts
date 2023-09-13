import * as express from "express";
import {
    getChefs,
    getChefById,
    addChef,
    updateChef,
    removeChef,
    addRestaurantToChef,
    removeRestaurantFromChef,
} from "./chef.controller";

const router = express.Router();

router.post("/", addChef);
router.get("/", getChefs);
router.get("/:id", getChefById);
router.put("/:id", updateChef);
router.delete("/:id", removeChef);
router.post("/:id/restaurant", addRestaurantToChef);
router.delete("/:id/restaurant", removeRestaurantFromChef); //
export default router;
