import { logger } from "../../services/logger.service";
import { bcrypt } from "bcrypt";
// import { Cryptr } from "cryptr";

async function signup(username, password, fullname) {
    const saltRounds = 10;

    logger.debug(
        `auth.service - signup with username: ${username}, fullname: ${fullname}`
    );
    if (!username || !password || !fullname)
        return Promise.reject("fullname, username and password are required!");

    const hash = await bcrypt.hash(password, saltRounds);
    return userService.add({ username, password: hash, fullname });
}
