// express
import express from "express"
// middleware
import { catchAsync } from "../utilis/catchAsync.js"
import { isLoggedIn } from "../middleware.js";
// controllers
import { campgroundsInd, campgroundsNew, campgroundsCreate, campgroundsShow } from "../controllers/campgrounds.js"
import { campgroundsEdit, campgroundsUpdate, campgroundsDelete } from "../controllers/campgrounds.js"
// multipart form data
import multer from 'multer';

import { storage } from "../cloudinary/index.js";
const upload = multer({ storage });

var router = express.Router();

router.route('/')
    .get(catchAsync(campgroundsInd))
    .post(isLoggedIn, upload.array('image'), catchAsync(campgroundsCreate))


router.get(isLoggedIn, campgroundsNew)

router.route('/:id')
    .get(catchAsync(campgroundsShow))
    .put(isLoggedIn, catchAsync(campgroundsUpdate))
    .delete(isLoggedIn, catchAsync(campgroundsDelete))

router.get('/:id/edit', isLoggedIn, catchAsync(campgroundsEdit))




const campgroundRoutes = router
export {campgroundRoutes}