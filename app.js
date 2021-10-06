import express from "express"
import mongoose from "mongoose"
import { Campground } from "./models/campground.js";
import { Review } from "./models/review.js";
import methodOverride from "method-override"
import ejsMate from 'ejs-mate';
import { catchAsync } from "./utilis/catchAsync.js"
import { ExpressError } from "./utilis/ExpressError.js"
import { campgroundSchema } from "./schemas.js"
import { reviewSchema } from "./schemas.js"


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

const validateCampground = (req, res, next) => {
    
    const{error} = campgroundSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(result.error.details, 400)
    }
    next(error)
}

const validateReview = (req, res, next) => {
    
    const{error} = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(result.error.details, 400)
    }
    next(error)
}


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

app.post('/campgrounds', validateCampground(catchAsync(async (req, res) => {
    const camp = new Campground(req.body.campground);
    await camp.save()
    res.redirect(`/campgrounds/${camp._id}`)
})))

app.get('/campgrounds/:id/', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    res.render(`./campgrounds/show.ejs`, {campground})
}))

app.post('/campgrounds/:id/reviews', validateReview(catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review)
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})))

app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))

app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render(`./campgrounds/edit.ejs`, {campground})
}))

app.put('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campgrounds/${campground._id}`)
}))

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds');
}))

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