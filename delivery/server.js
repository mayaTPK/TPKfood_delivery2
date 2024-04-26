if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

// importing libraries installed using npm
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const passport = require("passport")
const initializePassport = require("./passport-config")
const collection = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOveride = require("method-override")
const path =require("path")


// // DATABASE CODE START converting data into json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// // DATABASE END CODE
// //initializePassport starts
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )


// // MYSQL DATABASE CONNECTION

// // MYSQL DATABASE CONNECTION ends 

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

///// configuring Customer login part
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true
}))

////// configuring Restaurant login part
app.post("/rlogin", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/pages/dashboard.html",
    failureRedirect: "/rlogin",
    failureFlash: true
}))

////// configuring driver login part
app.post("/dlogin", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/pages/deliveryagent.html",
    failureRedirect: "/dlogin",
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


// configuring Restaurant Register part
app.post("/rsignup", async(req, res)=>{
    try {
        const hashedpassword = await bcrypt.hash(req.body.password,10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedpassword,
        })
        console.log(users);//displaying new users
        res.redirect("/rlogin")
    } catch (e) {
        console.log(e)
        res.redirect("/rsignup")
    }
})


// configuring driver Register part
app.post("/dregister", async(req, res)=>{
    try {
        const hashedpassword = await bcrypt.hash(req.body.password,10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedpassword,
        })
        console.log(users);//displaying new users
        res.redirect("/dlogin")
    } catch (e) {
        console.log(e)
        res.redirect("/dregister")
    }
})


// Serve static files from the 'public' directory
app.use(express.static('assets'));

// Routes


app.get('/',(req,res)=>{
    res.render("index1.ejs")
})


app.get('/home', checkAuthenticated,(req,res)=>{
    res.render("index.ejs", {name: req.user.name})
})

app.get('/login',(req,res)=>{
    res.render("login.ejs")
})

app.get('/register',(req,res)=>{
    res.render("register.ejs")
})

app.get('/rlogin',(req,res)=>{
    res.render("rlogin.ejs")
})

app.get('/rsignup',(req,res)=>{
    res.render("rsignup.ejs")
})

app.get('/dregister',(req,res)=>{
    res.render("dregister.ejs")
})

app.get('/dlogin',(req,res)=>{
    res.render("dlogin.ejs")
})

//End routes


// // DATABASE AREA 
// //app post register restaurant account
// app.post("/rsignup", async (req, res) =>{
//     const data = {
//         name: req.body.username,
//         email: req.body.email,
//         password: req.body.password
//     }
//     try {
//         const result = await collection.insertOne(data);
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }

//     // const userdata = await collection.insertMany(data);
//     // console.log(userdata);
// })
// //DATABASE END CODE


// logging out
app.delete('/logout',(req, res)=>{
    req.logout(req.user, err =>{
        if (err) return next(err)
        res.redirect("/")
    })
})


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