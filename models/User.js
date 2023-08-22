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
const mongoose = __importStar(require("mongoose"));
const bcrypt = __importStar(require("bcrypt"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail_1.default, "Please enter a valid email"],
    },
    username: {
        type: String,
        required: [true, "Please enter an username"],
        unique: true,
        lowercase: true,
    },
    fullname: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please enter an password"],
        minLength: [6, "Minimum password length is 6 characters"],
    },
});
//fire a function befoer doc saved to db
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("user about to created & saved", this);
        if (this.password) {
            const salt = yield bcrypt.genSalt();
            this.password = yield bcrypt.hash(this.password, salt);
        }
        next();
    });
});
// Static method to login user
userSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email });
        if (user) {
            const auth = yield bcrypt.compare(password, user.password);
            if (auth) {
                return user;
            }
            throw Error("incorrect password");
        }
        throw Error("incorrect email");
    });
};
// fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
    console.log("new user was created & saved", doc);
    next();
});
const User = mongoose.model("user", userSchema);
exports.default = User;
