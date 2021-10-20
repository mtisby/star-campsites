import mongoose from "mongoose"
import Campground from "../models/campground.cjs";
import { cities } from "./cities.js"
import {descriptors, places} from "./seedHelpers.js"

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61671349e5593325e3fbb76c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
              type: "Point",
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
              ]
          },
            image: [
                {
                  url: 'https://res.cloudinary.com/dr0ofxgkz/image/upload/v1634590148/YelpCamp/esdfwvyufapdecnhxvgj.jpg',
                  filename: 'YelpCamp/esdfwvyufapdecnhxvgj',
                },
                {
                  url: 'https://res.cloudinary.com/dr0ofxgkz/image/upload/v1634590151/YelpCamp/g3mkgrus3za9fdqrhenf.jpg',
                  filename: 'YelpCamp/g3mkgrus3za9fdqrhenf',
                }
              ],
              description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
              price
          })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})