import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import { userService } from "../user/user.service";
import { logger } from "../../services/logger.service";

const cryptr = new Cryptr(process.env.SECRET1 || "Secret-Puk-1234");

export interface User {
    _id?: string | undefined;
    username?: string;
    password?: string;
    fullname?: string;
    isAdmin?: boolean;
    createdAt?: Date;
}
async function login(username: string, password: string): Promise<User> {
    logger.debug(`auth.service - login with username: ${username}`);
    const user = await userService.getByUsername(username);
    if (!user || !user.password)
        throw new Error("Invalid username or password");
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid username or password");

    delete user.password;
    return user;
}

async function signup(
    username: string,
    password: string,
    fullname: string
): Promise<User | string> {
    const saltRounds = 10;

    logger.debug(
        `auth.service - signup with username: ${username}, fullname: ${fullname}`
    );
    if (!username || !password || !fullname)
        return Promise.reject("fullname, username and password are required!");

    const hash = await bcrypt.hash(password, saltRounds);
    return userService.add({ username, password: hash, fullname } as User);
}

function getLoginToken(user: User): string {
    const userInfo = {
        _id: user._id,
        fullname: user.fullname,
        isAdmin: user.isAdmin,
    };
    return cryptr.encrypt(JSON.stringify(userInfo));
}

function validateToken(loginToken: string): User | null {
    try {
        const json = cryptr.decrypt(loginToken);
        const loggedinUser: User = JSON.parse(json);
        return loggedinUser;
    } catch (err) {
        console.log("Invalid login token");
    }
    return null;
}

export const authService = { signup, login, getLoginToken, validateToken };
