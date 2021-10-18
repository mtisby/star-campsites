const express = require('express');
const campgrounds = require('../controllers/campgrounds.cjs');
const catchAsync  = require('../utilis/catchAsync.cjs');
const isLoggedIn  = require('../middleware.cjs');
const multer = require('multer');
const { storage } = require('../index.cjs');
const upload = multer({ storage });

const Campground = require('../models/campground.cjs');

console.log(`hello this is storage from controllers ${typeof storage}`)

var router = express.Router();

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), catchAsync(campgrounds.createCampground))
    // .post(upload.array('image'), (req, res) => {
    //     console.log(req);
    //     res.send('suck my fucking idck')
    // })

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, upload.array('image'), catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, catchAsync(campgrounds.renderEditForm))



console.log(`hello this is router from routes ${router} and type ${typeof router}`)
module.exports = router;



/*
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
import pkg from "../index.cjs"

const upload = multer(pkg.storage);

console.log(pkg.storage)
console.log(upload)

router.route('/')
    .get(catchAsync(campgroundsInd))
    .post(isLoggedIn, upload.array('image'), catchAsync(campgroundsCreate))
    // .post(upload.array('image'), (req, res) => {
    //     console.log(req);
    //     res.send('suck my fucking idck')
    // })

router.get('/new', isLoggedIn, campgroundsNew)

router.route('/:id')
    .get(catchAsync(campgroundsShow))
    .put(isLoggedIn, upload.array('image'), catchAsync(campgroundsUpdate))
    .delete(isLoggedIn, catchAsync(campgroundsDelete))

router.get('/:id/edit', isLoggedIn, catchAsync(campgroundsEdit))




const campgroundRoutes = router
export {campgroundRoutes}
*/