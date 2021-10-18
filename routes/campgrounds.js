// express
import express from "express"
var router = express.Router();
// middleware
import { catchAsync } from "../utilis/catchAsync.js"
import { isLoggedIn } from "../middleware.js";
// model
import { Campground } from "../models/campground.js";
// controllers
import { campgroundsInd, campgroundsNew, campgroundsCreate, campgroundsShow } from "../controllers/campgrounds.js"
import { campgroundsEdit, campgroundsUpdate, campgroundsDelete } from "../controllers/campgrounds.js"
// multipart form data
import multer from 'multer';

import pkg from "../cloudinary/index.cjs"
console.log(pkg)

const upload = multer(pkg.storage);

console.log(upload)

router.route('/')
    .get(catchAsync(campgroundsInd))
    .post(isLoggedIn, upload.array('image'), catchAsync(campgroundsCreate))
    // .post(upload.array('image'), (req, res) => {
    //     console.log(req.body);
    //     res.send('suck my fucking idck')
    // })

router.get('/new', isLoggedIn, campgroundsNew)

router.route('/:id')
    .get(catchAsync(campgroundsShow))
    .put(isLoggedIn, catchAsync(campgroundsUpdate))
    .delete(isLoggedIn, catchAsync(campgroundsDelete))

router.get('/:id/edit', isLoggedIn, catchAsync(campgroundsEdit))




const campgroundRoutes = router
export {campgroundRoutes}