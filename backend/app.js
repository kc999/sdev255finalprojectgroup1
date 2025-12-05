const express = require('express');
const cors = require('cors');
const Courses = require('./models/courses');
const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();


//Grab all course
router.get("/courses", async(req,res)=>{
    try{
        const courses = await Courses.find({})
        res.send(courses)
        console.log(courses)
    }
    catch (err)
    {
        console.log(err)
    }
})

app.use("/api",router)
app.listen(3000, ()=> {
    console.log("Listening on port 3000");
})

