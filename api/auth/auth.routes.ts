import * as express from "express";
import { signup } from "./auth.controller";

const router = express.Router();

router.post("/signup", signup);
// router.post("/login", login);
// router.get("logout", logout);

export default router;