import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import * as dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY!;

// interface DecodedToken {
//     id: string;
//     iat: number;
//     exp: number;
// }

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.jwt;
    const NOT_VALID = "NOT VALID";
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, SECRET_KEY, (err: any, decodedToken: any) => {
            if (err) {
                console.log(err.message);
                res.json(NOT_VALID);
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};

//check current user
export const checkUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    console.log("SECRET_KEY:", SECRET_KEY);

    if (token) {
        jwt.verify(token, SECRET_KEY, async (err: any, decodedToken: any) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};
