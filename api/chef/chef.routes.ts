import * as express from "express";
import {
    getChefs,
    getChefById,
    // addChef,
    // updateChef,
    // removeChef
} from "./chef.controller";

const router = express.Router();

router.get("/", getChefs);
router.get("/:id", getChefById);

// router.post("/",  addChef);
// router.put("/:id",  updateChef);
// router.delete("/:id",  removeChef);

export default router;
