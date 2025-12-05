require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Courses = require('./models/courses');
const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

const mongoURL = process.env.MONGO_INFO

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
//Add courses
router.post("/courses", async(req,res)=>{
    try{
        const course = await new Courses(req.body)
        await course.save();
        res.status(201).json(course)
        console.log(course);
    }
    catch (err)
    {
        res.status(400).send(err)
    }
})
router.get("/courses/:id", async(req, res) =>{
    try{
        course = await Courses.findById(req.params.id)
        res.json(course)
        
    }
    catch(err)
    {
        res.status(400).send(err)
        console.log(err)
    }
})
//Update is to update existing record
router.put("/courses/:id", async(req,res) => {
    //First find the song that needs to be updated
    //Request id of song from request, and then find and update it
    try{
        const course = req.body
        await Courses.updateOne({_id : req.params.id}, course)
        console.log(course)
        res.sendStatus(204)
    }
    catch (err)
    {
        res.status(400).send(err)
    }
})
router.delete("/courses/:id", async(req, res)=>{
    try{
        const course = req.body;
        await Courses.deleteOne({_id: req.params.id}, course)
        console.log(course)
        res.sendStatus(200)
    }
    catch(err)
    {
        res.status(400).send(err)
    }
})
app.use("/api",router)
app.listen(3000, ()=> {
    console.log("Listening on port 3000");
})

