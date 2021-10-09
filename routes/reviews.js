import express from "express"
import { Review } from "../models/review.js";
import { reviewSchema } from "../schemas.js"
import { catchAsync } from "../utilis/catchAsync.js"
import { ExpressError } from "../utilis/ExpressError.js"


var router = express.Router();

router.post('/reviews', validateReview(catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review)
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})))

router.delete('/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))

export {router}