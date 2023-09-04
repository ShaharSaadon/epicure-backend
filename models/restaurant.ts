import * as mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: String,
    industry: String,
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
