import * as express from "express";
import { signup, login, logout, getUser } from "./auth.controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user", getUser);

export default router;
