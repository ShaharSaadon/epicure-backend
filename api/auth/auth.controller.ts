import { Request, Response, response } from "express";
import * as jwt from "jsonwebtoken";
import User from "../../models/User";
import { ObjectId } from "mongodb";

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

// interface CustomError {
//     message: string;
//     code: number;
//     errors?: Record<string, { properties: ErrorProperties }>;
// }

const handleErrors = (err: any): Record<string, string> => {
    console.log(err.message, err.code);
    let errors: Record<string, string> = { email: "", password: "" };

    //incorrect email
    if (err.message === "incorrect email") {
        errors.email = "that email is not registered";
    }

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

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id: ObjectId) => {
    return jwt.sign({ id }, "shahar saadon secret", {
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
        console.log(req.body);
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
