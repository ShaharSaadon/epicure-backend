import { Request, Response } from "express";
import User from "../../models/User";
interface ErrorProperties {
    path: string;
    message: string;
}

interface CustomError {
    message: string;
    code: number;
    errors?: Record<string, { properties: ErrorProperties }>;
}

const handleErrors = (err: CustomError): Record<string, string> => {
    console.log(err.message, err.code);
    let errors: Record<string, string> = { email: "", password: "" };

    // duplicate email error
    if (err.code === 11000) {
        errors.email = "that email is already registered";
        return errors;
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors!).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

export const signup = async (req: Request, res: Response) => {
    console.log(req.body);
    const { email, password, username, fullname } = req.body;
    console.log(email, password, username, fullname);
    try {
        const user = await User.create({ email, password, username, fullname });
        res.status(201).json(user);
    } catch (err: any) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};
