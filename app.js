import dotenv from "dotenv"

if (process.env.NODE_ENV !== "productions") {
    dotenv.config()
}

import express from "express"
import mongoose from "mongoose"
import methodOverride from "method-override"
import ejsMate from 'ejs-mate';
// import { ExpressError } from "./utilis/ExpressError.js"
import * as ExpressError from "./utilis/ExpressError.cjs"
import campgroundRoutes from "./routes/campgrounds.cjs"
import { reviewRoutes } from "./routes/reviews.js"
import { userRoutes } from "./routes/user.js"
import session from "express-session"
import flash from "connect-flash"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { User } from './models/user.js'

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

console.log(`hello this is app.js campgroundRoutes ${campgroundRoutes} and type: ${typeof campgroundRoutes}`)
console.log(`hello this is app.js reviewRoutes ${reviewRoutes} and type: ${typeof reviewRoutes}`)


const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));

const sessionConfig = {
    secret: 'oopsmysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)
app.use('/', userRoutes)


app.get('/', (req, res) => {
    res.render('./home')
})

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