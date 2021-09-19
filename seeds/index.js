import mongoose from "mongoose"
import { Campground } from "../models/campground.js";
import { cities } from "./cities.js"
import {descriptors, places} from "./seedHelpers.js"

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => Math.floor(Math.random() * array.length);

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const getNum = Math.ceil(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[getNum].city}, ${cities[getNum].state}`,
            title: `${descriptors[sample(descriptors)]} ${places[sample(places)]}`
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})