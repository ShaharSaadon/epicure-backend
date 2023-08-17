import * as express from "express";
import {
    getAllData,
    getChefs,
    getDishes,
    getRestaurants,
} from "./admin.controller";

const router = express.Router();

router.get("/", getAllData);
router.get("/chef", getChefs);
router.get("/restaurant", getRestaurants);
router.get("/dish", getDishes);

// router.post("/",  addChef);
// router.put("/:id",  updateChef);
// router.delete("/:id",  removeChef);

export default router;
