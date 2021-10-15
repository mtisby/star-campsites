// express
import express from "express"

// middleware
import { catchAsync } from "../utilis/catchAsync.js"

// controllers
import { createReview, deleteReview } from "../controllers/reviews.js"


// router
var router = express.Router({mergeParams: true});

// routes
router.post('/', catchAsync(createReview))

router.delete('/:reviewId', catchAsync(deleteReview))

const reviewRoutes = router
export {reviewRoutes}