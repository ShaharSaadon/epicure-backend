import * as express from "express";
import {
    getChefs,
    getChefById,
    addChef,
    updateChef,
    removeChef,
} from "./chef.controller";

const router = express.Router();

router.post("/", addChef);
router.get("/", getChefs);
router.get("/:id", getChefById);
router.put("/:id", updateChef);
router.delete("/:id", removeChef);

export default router;
