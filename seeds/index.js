import mongoose from "mongoose"
import Campground from "../models/campground.cjs";
import { cities } from "./cities.js"
import {descriptors, places} from "./seedHelpers.js"
import { images } from "./imageSeedHelpers.js"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/star-campsites';

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 31; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '618c285b033eb93a92b5cc73',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
              type: "Point",
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
              ]
          },
            images: [
                images[i],
                images[i+1]
              ],
              description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
              price
          })
        await camp.save();
        console.log(camp.images[0].url)
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})