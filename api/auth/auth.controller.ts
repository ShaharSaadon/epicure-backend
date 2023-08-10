import { Request, Response } from "express";
import { authService } from "./auth.service";
import { logger } from "../../services/logger.service";
import { User } from "./auth.service";
async function login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
        const user: User = await authService.login(username, password); // Now we're sure this is a User
        const loginToken = authService.getLoginToken(user);
        logger.info("User login: ", user);
        res.cookie("loginToken", loginToken);
        res.json(user);
    } catch (err) {
        // Handle the error here. If the error is a string, send it as the response.
        logger.error("Failed to Login " + err);
        res.status(401).send({
            err: typeof err === "string" ? err : "Failed to Login",
        });
    }
}

async function signup(req: Request, res: Response): Promise<void> {
    try {
        const { username, password, fullname } = req.body;
        const account = await authService.signup(username, password, fullname);
        logger.debug(
            `auth.route - new account created: ` + JSON.stringify(account)
        );
        const user = await authService.login(username, password);
        const loginToken = authService.getLoginToken(user);
        logger.info("User login: ", user);
        res.cookie("loginToken", loginToken);

        res.json(user);
    } catch (err) {
        logger.error("Failed to signup " + err);
        res.status(500).send({ err: "Failed to signup" });
    }
}

async function logout(req: Request, res: Response): Promise<void> {
    try {
        res.clearCookie("loginToken");
        res.send({ msg: "Logged out successfully" });
    } catch (err) {
        res.status(500).send({ err: "Failed to logout" });
    }
}

export { login, signup, logout };
