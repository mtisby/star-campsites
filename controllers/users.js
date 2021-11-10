import { User } from "../models/user.js"

const registerForm = (req, res) => {
    res.render("users/register.ejs")
}

const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, error => {
            if (error) {
                return next(error)
            } else {
                req.flash('success', 'Welcome to YelpCamp')
                res.redirect('/campgrounds') 
            }
        })
    } catch (e) {
        console.log(e)
        req.flash('error', e.message);
        res.redirect('register')
    }
    
}

const loginForm = (req, res) => { 
    res.render("users/login.ejs")
}

const login = (req, res) => {
    req.flash('success', "Welcome Back!");
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

const logout = (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
}

export { registerForm, register, loginForm, login, logout}