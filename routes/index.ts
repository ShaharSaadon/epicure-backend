import express, { Express } from "express";

import restaurantRoutes from "../api/restaurant/restaurant.routes";
import dishRoutes from "../api/dish/dish.routes";
import chefRoutes from "../api/chef/chef.routes";
import authRoutes from "../api/auth/auth.routes";
import adminRoutes from "../api/admin/admin.routes";

const router = express.Router();

router.use("/restaurant", restaurantRoutes);
router.use("/chef", chefRoutes);
router.use("/dish", dishRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;
