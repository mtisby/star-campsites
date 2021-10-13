import express from "express"
import { User } from "../models/user.js"
import { catchAsync } from "../utilis/catchAsync.js"
import passport from "passport"
// import { User } from './models/user.js'

const router = express.Router()

router.get('/register', (req, res) => {
    res.render("users/register.ejs")
})

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, error => {
            if (err) {
                return next(err)
            } else {
                req.flash('success', 'Welcome to YelpCamp')
                res.redirect('/campgrounds') 
            }
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register')
    }
    
}))

router.get('/login', (req, res) => { 
    res.render("users/login.ejs")
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', "Welcome Back!");
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
})

const userRoutes = router
export { userRoutes }