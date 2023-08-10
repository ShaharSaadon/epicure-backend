import { authService } from "./auth.service";
import { logger } from "../../services/logger.service";

interface RequestBody {
    mail: string;
    password: string;
}

interface User {
    id: string;
    mail: string;
    password: string;
}

async function signup(req: { body: RequestBody }, res: any): Promise<void> {
    try {
        const { mail, password } = req.body;
        const account: User = await authService.signup(password, mail);
        logger.debug(
            `auth.route - new account created: ` + JSON.stringify(account)
        );
        const user: User = await authService.login(mail, password);
        const loginToken: string = authService.getLoginToken(user);
        logger.info("User login: ", user);
        res.cookie("loginToken", loginToken);
        res.json(user);
    } catch (err) {
        logger.error("Failed to signup " + err);
        res.status(500).send({ err: "Failed to signup" });
    }
}

module.exports = {
    signup,
};
