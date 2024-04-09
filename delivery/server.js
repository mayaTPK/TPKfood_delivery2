if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

// importing libraries installed using npm
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOveride = require("method-override")

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )




const users = []

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // not resaving the session if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOveride("_method"))

// configuring Customer login part
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true
}))


// configuring Customer Register part
app.post("/register", checkNotAuthenticated, async(req, res)=>{
    try {
        const hashedpassword = await bcrypt.hash(req.body.password,10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedpassword,
        })
        console.log(users);//displaying new users
        res.redirect("/login")
    } catch (e) {
        console.log(e)
        res.redirect("/register")
    }
})



// Serve static files from the 'public' directory
app.use(express.static('assets'));

// Routes

app.get('/',(req,res)=>{
    res.render("index1.ejs")
})

app.get('/restaurant',(req,res)=>{
    res.render("restaurantdash.ejs")
})

app.get('/home', checkAuthenticated,(req,res)=>{
    res.render("index.ejs", {name: req.user.name})
})

app.get('/login',checkNotAuthenticated,(req,res)=>{
    res.render("login.ejs")
})

app.get('/register',checkNotAuthenticated,(req,res)=>{
    res.render("register.ejs")
})

// logging out
app.delete('/logout',(req, res)=>{
    req.logout(req.user, err =>{
        if (err) return next(err)
        res.redirect("/home")
    })
})

//End routes

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/home")
    }
    next()
}

app.listen(3000)