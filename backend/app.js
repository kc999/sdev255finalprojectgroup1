require('dotenv').config();
const express = require('express');
var cors = require('cors');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs')
const Courses = require('./models/courses');
const User = require('./models/users');
const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

const mongoURL = process.env.MONGO_INFO

// COURSE INTERACTIONS
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
    //First find the course that needs to be updated
    //Request id of course from request, and then find and update it
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


// USER INTERACTIONS

//POST login
router.post("/auth", async(req,res) =>{
    if(!req.body.username || !req.body.password){
        res.status(401).json({error: "Missing username or password"})
        return
    }
    // try to find username in database, then see if it matches with username and password
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user) {
            res.status(401).json({error:"Bad Username"})
        } else {
            //check to see if user password matches request password
            if(bcrypt.compareSync(req.body.password, user.password)){
                // successful login
                // creates a token encoded with the jwt library and sends back the user... this will be important later
                // we also will send back as part of the token that you are currently authorized

                const token = jwt.encode({username: user.username}, secret)
                //const auth = 1
                res.json({
                    token: token, 
                    username: user.username, 
                    userID: user._id
                    //auth:auth
                })
            } else {
                res.status(401).json({error: "Bad Password"})
            }
        }
    } catch(err){
        res.status(400).send(err.message)
    }
})


//POST REGISTER


///WIP








app.use("/api",router)
app.listen(3000, ()=> {
    console.log("Listening on port 3000");
})

