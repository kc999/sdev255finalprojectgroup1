//Schema for courses
const db = require("../db");

const User = db.model("User",{
    name: {type:String, required: true},
    username: {type:String, required: true},
    password: {type:String, required: true},
    role: {type:String, required: true}
})

module.exports = User;