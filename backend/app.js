require('dotenv').config();
require('./db');
const express = require('express');
var cors = require('cors');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs')
const Courses = require('./models/courses');
const User = require('./models/users');
const app = express();
app.use(express.json());
app.use(cors());
//secret for bcryptjs
secret = process.env.SECRET;

const router = express.Router();

const mongoURL = process.env.MONGO_INFO

// COURSE INTERACTIONS
//Grab all course
router.get("/courses", async(req,res)=>{
    try{
        const courses = await Courses.find({})
        res.send(courses)
        //console.log(courses)
    }
    catch (err)
    {
        console.log(err)
    }
})
//Add courses
router.post("/courses", async(req,res)=>{
    try{
        //grabs encoded token from request
        const token = req.body.token
        //decodes token using jwt-simple, which yields the original {username:x, role:y} format
        decoded = jwt.decode(token, secret).role
        if (decoded == "Teacher"){
            const course = await new Courses(req.body.course)
            await course.save();
            res.status(201).json(course)
            //console.log(course);
        } else {
            //sends forbidden
            res.status(403).json({error:"You are not a Teacher"})
        }
        
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
        //grabs encoded token from request
        const token = req.body.token
        //decodes token using jwt-simple, which yields the original {username:x, role:y} format
        decoded = jwt.decode(token, secret).role
        if (decoded == "Teacher"){
            const course = req.body.course
            await Courses.updateOne({_id : req.params.id}, course)
            //console.log(course)
            res.sendStatus(204)
        } else {
            //sends forbidden
            res.status(403).json({error:"You are not a Teacher"})
        }
    }
    catch (err)
    {
        res.status(400).send(err)
    }
})
//Update a users course array in their database entry when a course is added to their schedukle
router.put("/users/add-course", async (req, res) =>{
    try {
        const token = req.body.token;
        const course = req.body.course;
        //Decode token to get user
        const decoded = jwt.decode(token,secret);
        //Get user and push changes
        const updateUser = await User.findOneAndUpdate(
            {username: decoded.username},
            {$push: {courses: course}},
            {new: true}
        );
        //If the update fails, alert the user/server
        if (!updateUser)
        {
            res.status(404).json({error: "User not found. Course not added"});
        }
        res.status(200).json({message: "Course added to user"});
    }
    catch (err){
        res.status(400).send(err);
    }

})
//Removes a course from student's course array
//Update a users course array in their database entry when a course is added to their schedukle
router.put("/users/remove-course", async (req, res) =>{
    try {
        const token = req.body.token;
        const course = req.body.course;
        //Decode token to get user
        const decoded = jwt.decode(token,secret);
        //Get user and push changes
        const updateUser = await User.findOneAndUpdate(
            {username: decoded.username},
            { $pull: { courses: { _id: course } } },
            {new: true}
        );
        //If the update fails, alert the user/server
        if (!updateUser)
        {
            res.status(404).json({error: "User not found. Course removed"});
        }
        res.status(200).json({message: "Course removed"});
    }
    catch (err){
        res.status(400).send(err);
    }

})
router.delete("/courses/:id", async(req, res)=>{
    try{
        //Grab token from request
        const token = req.body.token
        //Decode token
        decoded = jwt.decode(token,secret).role
        if (decoded == "Teacher")
        {
            const delId = req.params.id
            //const course = req.body;
            await Courses.deleteOne({delId})
            //console.log(delId)
            res.sendStatus(200)
        }
        else {
            //sends forbidden
            res.status(403).json({error:"You are not a Teacher"})
        }
    }
    catch(err)
    {
        res.status(400).send(err)
    }
})


// USER INTERACTIONS

//POST login
router.post("/login", async(req,res) =>{
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
                // creates a token encoded with the jwt library
                //sends other user info that is not private
                const token = jwt.encode({username: user.username, role: user.role}, secret)
                res.json({
                    token: token, 
                    name: user.name,
                    username: user.username, 
                    role: user.role
                })
                console.log(`Successfully responded with ${user}, ${token}`)
            } else {
                res.status(401).json({error: "Bad Password"})
            }
        }
    } catch(err){
        res.status(400).send(err.message)
    }
})


// // POST REGISTER
// added to populate database for testing purposes
// creating a new user
router.post("/register", async(req,res) =>{
    if(!req.body.name || !req.body.username || !req.body.password || !req.body.role){
        res.status(400).json({error: "Missing necessary value"})
    }
    //create hash for password encryption
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = await new User({
        name: req.body.name,
        username: req.body.username,
        password: hash,
        role: req.body.role
    })
    try{
        await newUser.save()
        res.sendStatus(201) //success 
        console.log(newUser)
    } catch(err){
        res.status(400).send(err.message)
    }
})

// DELETE
// This is for deleting users from database and can be deleted before final project submission
// router.delete("/delete/:username", async(req,res) =>{
//     try{
//         const deletedUser = await User.deleteOne({username: req.params.username})
//         if (deletedUser.deletedCount === 0) {
//             console.log('No documents matched query. Nothing was deleted.')
//             res.sendStatus(404)
//         } else {
//             console.log('The document was deleted successfully')
//             res.sendStatus(200)
//         }
//     } catch(err) {
//         console.log(err)
//         res.status(400).send(err)
//     }

// })




app.use("/api",router)
app.listen(3000, ()=> {
    console.log("Listening on port 3000");
})

