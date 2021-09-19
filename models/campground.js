import { mongoose, Schema } from "mongoose"

const Schmea = mongoose.Schmea;

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String
})

export {CampgroundSchema}