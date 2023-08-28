"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.logout = exports.login = exports.signup = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../models/User"));
const maxAge = 3 * 24 * 60 * 60;
const SECRET_KEY = process.env.SECRET_KEY;
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };
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
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};
const createToken = (id) => {
    // PAYLOAD
    return jwt.sign({ id }, SECRET_KEY, {
        expiresIn: maxAge, // 3 DAYS IN SECONDS
    });
};
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, fullname } = req.body;
    console.log(email, password, username, fullname);
    try {
        const user = yield User_1.default.create({ email, password, username, fullname });
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            maxAge: maxAge * 1000, // 3 DAYS IN MILISECOND
        });
        res.status(201).json(user._id);
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            maxAge: maxAge * 1000, // 3 DAYS IN MILISECOND
        });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("logout backend");
    res.cookie("jwt", "", { maxAge: -1 });
    res.status(200).send("Logged out");
});
exports.logout = logout;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies;
        console.log("token=", token);
        if (token) {
            const decodedToken = jwt.verify(token, SECRET_KEY);
            const user = yield User_1.default.findById(decodedToken.id);
            res.status(200).json(user);
        }
        else {
            res.status(401).send("Not authenticated");
        }
    }
    catch (err) {
        res.status(400).send("Error fetching user");
    }
});
exports.getUser = getUser;
