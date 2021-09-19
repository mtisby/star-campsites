import express from "express"
import mongoose from "mongoose"
import { Campground } from "./models/campground.js";

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const app = express();
const port = 3000;

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('./home')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('./campgrounds/index.ejs', {campgrounds})
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: "My Backyard", description: "super cheap, p much free"})
    await camp.save();
    res.send(camp);
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new.ejs');
})

app.post('/campgrounds', async (req, res) => {
    const camp = new Campground(req.body.campground);
    await camp.save()
    res.redirect(`/campgrounds/${camp._id}`)
})

app.get('/campgrounds/:id/', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render(`./campgrounds/show.ejs`, {campground})
})

app.listen(3000, () => {
    console.log(`listening on : ${port}`)
})