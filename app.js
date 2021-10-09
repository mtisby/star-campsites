import express from "express"
import mongoose from "mongoose"
import methodOverride from "method-override"
import ejsMate from 'ejs-mate';
import { ExpressError } from "./utilis/ExpressError.js"
import { campgrounds } from "./routes/campgrounds.js"
import { reviews } from "./routes/reviews.js"

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

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)


app.get('/', (req, res) => {
    res.render('./home')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render('error.ejs', {err})
})

app.listen(3000, () => {
    console.log(`listening on : ${port}`)
})