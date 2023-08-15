import express, { Express } from "express";
import { checkUser, requireAuth } from "../middleware/authMiddleware";
import restaurantRoutes from "../api/restaurant/restaurant.routes";
import dishRoutes from "../api/dish/dish.routes";
import chefRoutes from "../api/chef/chef.routes";
import authRoutes from "../api/auth/auth.routes";
import adminRoutes from "../api/admin/admin.routes";

const router = express.Router();

router.get("*", checkUser);
router.use("/auth", authRoutes);
router.use("/restaurant", restaurantRoutes);
router.use("/chef", chefRoutes);
router.use("/dish", dishRoutes);
router.use("/admin", requireAuth, adminRoutes);

export default router;
