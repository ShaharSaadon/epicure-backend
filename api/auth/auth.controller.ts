import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import * as jwt from "jsonwebtoken";
import User from "../../models/User";
import { checkUser } from "../../middleware/authMiddleware";
interface ErrorProperties {
    path: string;
    message: string;
}
interface ValidationError {
    properties: {
        path: string;
        message: string;
    };
}
interface JwtPayload {
    id: ObjectId;
    iat?: number;
    exp?: number;
    // Add any other properties you might have in the payload
}
const maxAge = 3 * 24 * 60 * 60;
const SECRET_KEY = process.env.SECRET_KEY!;

const handleErrors = (err: any): Record<string, string> => {
    console.log(err.message, err.code);
    let errors: Record<string, string> = { email: "", password: "" };

    //incorrect email
    if (err.message === "incorrect email") {
        errors.email = "that email is not registered";
    }
    //incorrect password
    if (err.password === "incorrect password") {
        errors.password = "that password is incorrect";
    }
    // duplicate email error
    if (err.code === 11000) {
        errors.email = "that email is already registered";
        return errors;
    }
    // validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors! as Record<string, ValidationError>).forEach(
            ({ properties }) => {
                errors[properties.path] = properties.message;
            }
        );
    }

    return errors;
};

const createToken = (id: ObjectId) => {
    // PAYLOAD
    return jwt.sign({ id }, SECRET_KEY, {
        expiresIn: maxAge, // 3 DAYS IN SECONDS
    });
};

export const signup = async (req: Request, res: Response) => {
    const { email, password, username, fullname } = req.body;
    console.log(email, password, username, fullname);
    try {
        const user = await User.create({ email, password, username, fullname });
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            maxAge: maxAge * 1000, // 3 DAYS IN MILISECOND
        });

        res.status(201).json(user._id);
    } catch (err: any) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            maxAge: maxAge * 1000, // 3 DAYS IN MILISECOND
        });
        res.status(200).json({ user: user._id });
    } catch (err: any) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};
export const logout = async (req: Request, res: Response) => {
    console.log("logout backend");
    res.cookie("jwt", "", { maxAge: -1 });
    res.status(200).send("Logged out");
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const token = req.cookies;
        console.log("token=", token);
        if (token) {
            const decodedToken = jwt.verify(token, SECRET_KEY) as JwtPayload;
            const user = await User.findById(decodedToken.id);
            res.status(200).json(user);
        } else {
            res.status(401).send("Not authenticated");
        }
    } catch (err) {
        res.status(400).send("Error fetching user");
    }
};
