//Schema for courses
const db = require("../db");

const Courses = db.model("Courses",{
    courseName: {type:String, required: true},
    coursePrefix: String,
    description: String,
    subjectArea: [String],
    numberOfCredits: Number
})

module.exports = Courses;