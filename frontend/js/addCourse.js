addEventListener("DOMContentLoaded", function(){
    document.querySelector("#addBtn").addEventListener("click", addCourse);
})

async function addCourse(){
    const course = {
        courseName: document.querySelector("#courseName").value,
        coursePrefix: document.querySelector("#coursePrefix").value,
        description: document.querySelector("#description").value,
        subjectArea: document.querySelector("#subjectArea").value ? document.querySelector("#subjectArea").value.split(",") : [],
        numberOfCredits: document.querySelector("#numberOfCredits").value

    }
    //grabs user token to send back as well to verify credentials before updating course
    const token = JSON.parse.localStorage.getItem("user").token
    const response = await fetch("http://localhost:3000/api/courses", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({course:course,token:token})
    })
    if (response.ok)
    {
        const results = await response.json()
        alert("Added course with ID of ..." + results._id)

        //Reset form
        document.querySelector("form").reset();
    }
    else
    {
        document.querySelector("#error").innerHTML = "Cannot add course";
    }
}


