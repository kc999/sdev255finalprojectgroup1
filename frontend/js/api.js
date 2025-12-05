addEventListener("DOMContentLoaded", async function(){
    const response = await this.fetch("http://localhost:3000/api/courses");
    const courses = await response.json();

    let html = "";
    for (let course of courses)
    {
        courseID = course._id
        html += `<li><h4>${course.coursePrefix}:${course.courseName}</h4> - ${course.description} Credits: ${course.numberOfCredits}
        <a href="edit.html?id=${courseID}">Edit Course</a></li>`
    }
    this.document.querySelector('#courses-container').innerHTML = html;
})