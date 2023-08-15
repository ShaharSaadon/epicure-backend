import * as express from "express";
import { getAllData } from "./admin.controller";

const router = express.Router();

router.get("/", getAllData);

// router.post("/",  addChef);
// router.put("/:id",  updateChef);
// router.delete("/:id",  removeChef);

export default router;
