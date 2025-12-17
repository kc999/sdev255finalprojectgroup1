const user = JSON.parse(localStorage.getItem("user"));
if(!user || user.role !== "Teacher") {
    alert("Access denied");
    window.location.href = "index.html";
}

const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

document.addEventListener("DOMContentLoaded", async () => {
    await loadCourse();
});

async function loadCourse() {
    const res = await fetch(`http://localhost:3000/api/courses/${courseId}`);
    const course = await res.json();

    document.querySelector("#courseName").value = course.courseName;
        document.querySelector("#coursePrefix").value = course.coursePrefix;
        document.querySelector("#description").value = course.description;
        document.querySelector("#subjectArea").value = course.subjectArea;
        document.querySelector("#numberOfCredits").value = course.numberOfCredits;
}

document.getElementById("edit-course-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedCourse = {
        coursePrefix: document.getElementById("coursePrefix").value,
        courseName: document.getElementById("courseName").value,
        description: document.getElementById("description").value,
        numberOfCredits: document.getElementById("numberOfCredits").value,
    };

    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/api/courses/${courseId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ course: updatedCourse })
    });

    if (res.ok) {
        alert("Course updated!");
        window.location.href = "index.html";
    } else {
        alert("Update failed");
    }
});