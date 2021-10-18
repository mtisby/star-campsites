// express
import express from "express"

// middleware
// import { catchAsync } from "../utilis/catchAsync.js"
import catchAsync from "../utilis/catchAsync.cjs"

console.log(`HELLO ${typeof catchAsync}`)

// controllers
import * as reviews from "../controllers/reviews.cjs"

// router
var router = express.Router({mergeParams: true});

// routes
router.post('/', catchAsync(reviews.createReview))

router.delete('/:reviewId', catchAsync(reviews.deleteReview))

const reviewRoutes = router
export {reviewRoutes}