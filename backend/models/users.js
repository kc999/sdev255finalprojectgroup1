//Schema for courses
const db = require("../db");

const User = db.model("User",{
    name: {type:String, required: true},
    username: {type:String, required: true},
    password: {type:String, required: true},
    authorized: {type:Boolean, required: true},
})

module.exports = User;