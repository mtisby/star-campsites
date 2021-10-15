// express & passport
import express from "express"
import passport from "passport"

// middleware
import { catchAsync } from "../utilis/catchAsync.js"

// controllers
import { registerForm, register, loginForm, login, logout} from "../controllers/users.js"

const router = express.Router()

router.route('/register')
    .get(registerForm)
    .post(catchAsync(register))

router.route('/login')
    .get(loginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), login)

router.get('/logout', logout)

const userRoutes = router
export { userRoutes }