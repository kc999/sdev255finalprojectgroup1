addEventListener("DOMContentLoaded", async function(){
    updateNavBar() //from auth.js

    //complicated section to check user role, need to tidy up but typeError if trying to access localStorage while not logged in
    let isTeacher = false
    //have to check if localStorage for user is not null before parsing as JSON and checking for value
    if (localStorage.getItem("user") != null){
        //parse as JSON and checking for value == Teacher
        if (JSON.parse(localStorage.getItem("user")).role = "Teacher"){
            isTeacher = true
        }
        // if (JSON.parse(localStorage("user")).role
    }
    if (isTeacher == false) {
        this.alert("Only a Teacher can edit courses.\nYou can continue in read-only mode.")
        document.querySelector("#editBtn").style.display="none"
        document.querySelector("#deleteBtn").style.display="none"
    }



    document.querySelector("#editBtn").addEventListener("click", updateCourse);
    document.querySelector("#deleteBtn").addEventListener("click", deleteCourse);
    const urlParam = new URLSearchParams(window.location.search)
    const courseID = urlParam.get('id')
    const response = await this.fetch("http://localhost:3000/api/courses/" + courseID)
    if (response.ok)
    {
        let course = await response.json()
        document.querySelector("#courseID").value = course._id
        document.querySelector("#courseName").value = course.courseName
        document.querySelector("#coursePrefix").value = course.coursePrefix
        document.querySelector("#description").value = course.description
        document.querySelector("#subjectArea").value = course.subjectArea
        document.querySelector("#numberOfCredits").value = course.numberOfCredits
    }

    async function updateCourse(){
        //Create Course object from  form field
        const courseID = document.querySelector("#courseID").value
        const course = {
            _id: document.querySelector("#courseID").value,
        courseName: document.querySelector("#courseName").value,
        coursePrefix: document.querySelector("#coursePrefix").value,
        description: document.querySelector("#description").value,
        numberOfCredits: document.querySelector("#numberOfCredits").value,
        subjectArea: document.querySelector("#subjectArea").value ? 
        document.querySelector("#subjectArea").value.split(",") : []
        }
        //grabs user token to send back as well to verify credentials before updating course
        const token = JSON.parse.localStorage.getItem("user").token
        const response = await fetch("http://localhost:3000/api/courses/" + courseID,{
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            //sends course object and token object
            body: JSON.stringify({course:course,token:token})
        })
        if (response.ok){
            alert("Updated Course")
        }
        else
        {
            document.querySelector("error").innerHTML = "Cannot update course"
        }
    }
    async function deleteCourse(){
        const courseId = document.querySelector("#courseID").value
        if (!confirm("Are you sure you want to delete this course? This can't be undone!"))
        {
            return;
        }
        const response = await fetch("http://localhost:3000/api/courses/" + courseID,{
            method: "DELETE"
        })
        if (response.ok){
            alert("Course successfully deleted")
            window.location.href= "index.html";
        }
        else{
            document.querySelector("error").innerHTML = "Cannot delete course"
        }
    }
})
