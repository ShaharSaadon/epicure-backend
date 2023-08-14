import * as mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import * as bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    email: {
        type: String,

        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"],
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
// fire a function after doc saved to db

userSchema.post("save", function (doc, next) {
    console.log("new user was created & saved", doc);
    next();
});

//fire a function befoer doc saved to db
userSchema.pre("save", async function (next) {
    console.log("user about to created & saved", this);
    if (this.password) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
const User = mongoose.model("user", userSchema);

export default User;
