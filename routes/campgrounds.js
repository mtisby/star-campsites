// express
import express from "express"
// middleware
import { catchAsync } from "../utilis/catchAsync.js"
import { isLoggedIn } from "../middleware.js";
// controllers
import { campgroundsInd, campgroundsNew, campgroundsCreate, campgroundsShow } from "../controllers/campgrounds.js"
import { campgroundsEdit, campgroundsUpdate, campgroundsDelete } from "../controllers/campgrounds.js"


var router = express.Router();

router.route('/')
    .get(catchAsync(campgroundsInd))
    .post(isLoggedIn, catchAsync(campgroundsCreate))

router.get(isLoggedIn, campgroundsNew)

router.route('/:id')
    .get(catchAsync(campgroundsShow))
    .put(isLoggedIn, catchAsync(campgroundsUpdate))
    .delete(isLoggedIn, catchAsync(campgroundsDelete))

router.get('/:id/edit', isLoggedIn, catchAsync(campgroundsEdit))




const campgroundRoutes = router
export {campgroundRoutes}