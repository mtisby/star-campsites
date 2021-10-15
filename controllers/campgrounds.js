import { Campground } from "../models/campground.js";
import { ExpressError } from "../utilis/ExpressError.js"
import { campgroundSchema } from "../schemas.js"

const campgroundsInd = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('./campgrounds/index.ejs', {campgrounds})
}

const campgroundsNew  = (req, res) => {
    res.render('campgrounds/new.ejs');
}

const campgroundsCreate = async (req, res) => {
    const{error} = campgroundSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(result.error.details, 400)
    }
    const camp = new Campground(req.body.campground);
    await camp.save()
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${camp._id}`)
}

const campgroundsShow = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show.ejs', { campground });
}

const campgroundsEdit = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit.ejs', { campground });
}

const campgroundsUpdate = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'you do not have permissions')
        return res.redirect(`campgrounds/${id}`)
    }
    const camp = Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

const campgroundsDelete = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}

export { campgroundsInd, campgroundsNew, campgroundsCreate, campgroundsShow, campgroundsEdit, campgroundsUpdate, campgroundsDelete}