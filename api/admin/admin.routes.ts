import * as express from "express";
import { getAllData } from "./admin.controller";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", requireAuth, getAllData);

// router.post("/",  addChef);
// router.put("/:id",  updateChef);
// router.delete("/:id",  removeChef);

export default router;
