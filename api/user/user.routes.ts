import express, { Router } from "express";
import {
    requireAuth,
    requireAdmin,
} from "../../middlewares/requireAuth.middleware";

import { getUser, getUsers, deleteUser, updateUser } from "./user.controller";

const router: Router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);

// router.put('/:id',  requireAuth, updateUser)
// router.delete("/:id", requireAuth, requireAdmin, deleteUser);

export default router;
