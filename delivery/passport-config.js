const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")




// // THIS IS FOR THE DATABASE CONNECTION(IT IS NOT WORKING NOW)
// //__________________________________________
// const mongoose = require("mongoose")
// const connect = mongoose.connect("mongodb://127.0.0.1:27017/tpkfood")

// //checking database connection
// connect.then(() =>{
//     console.log("database connected successfully")
// })
// .catch(() =>{
//     console.log("database cannot be connected")
// })

// // creating database schema
// const logInSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true
//     },
//     email:{
//         type: String,
//         required: true
//     },
//     password:{
//         type: String,
//         required: true
//     }
// })

// // collection part
// const collection = new mongoose.model("users", logInSchema)

// module.exports = collection;

// //______________________________________________
// //DATAASE EDIT END CODE






function initialize(passport, getUserByEmail, getUserById){
    //function to authenticate users
    const authenticateUsers = async(email, password, done) => {
        // get users by email
        const user = getUserByEmail(email)
        if (user == null){
            return done(null, false, {message: "No user found with that email"})
        }
        try {
            if (await bcrypt.compare(password, user.password)){
                return done(null,user)
            } else{
                return done (null, false, {message: "Password Incorrect"})
            }  
        } catch (e) {
            console.log(e)
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUsers))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done)=>{
        return done(null, getUserById(id))
    })
}

module.exports = initialize