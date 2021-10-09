import express from "express"
import { Campground } from "../models/campground.js";
import { campgroundSchema } from "../schemas.js"
import { catchAsync } from "../utilis/catchAsync.js"
import { ExpressError } from "../utilis/ExpressError.js"


var router = express.Router();

router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('./campgrounds/index.ejs', {campgrounds})
})


router.get('/new', (req, res) => {
    res.render('campgrounds/new.ejs');
})

router.post('/', catchAsync(async (req, res) => {
    const{error} = campgroundSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(result.error.details, 400)
    }
    const camp = new Campground(req.body.campground);
    await camp.save()
    res.redirect(`/campgrounds/${camp._id}`)
}))

router.get('/:id/', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    res.render(`./campgrounds/show.ejs`, {campground})
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render(`./campgrounds/edit.ejs`, {campground})
}))

router.put('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds');
}))

export { router }