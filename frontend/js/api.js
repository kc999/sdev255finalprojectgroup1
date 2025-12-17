const currentUser = JSON.parse(localStorage.getItem("user"));
const userRole = currentUser?.role;

document.addEventListener("DOMContentLoaded", async () => {
    updateNavBar();
    await loadCourses();
    setupFilters();
    setUpSearch();
});

// Store all courses globally
let allCourses = [];

// Load courses from backend
async function loadCourses() {
    try {
        const response = await fetch("http://localhost:3000/api/courses");
        allCourses = await response.json();

        populateSubjectFilter(allCourses);
        renderCourses(allCourses);
    } catch (error) {
        console.error("Failed to load courses:", error);
    }
}

// Render courses to page
function renderCourses(courses) {
    const container = document.getElementById("courses-container");
    container.innerHTML = "";

    if (courses.length === 0) {
        container.innerHTML = "<p>No courses match your filters.</p>";
        return;
    }

    courses.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        let buttons = "";

        // STUDENT buttons
        if (userRole === "Student") {
            buttons = `
                <button class="add-btn" onclick="addToSchedule('${course._id}')">
                    Add to Schedule
                </button>
            `;
        }

        // TEACHER buttons
        if (userRole === "Teacher") {
            buttons = `
                <button class="edit-btn" onclick="editCourse('${course._id}')">
                    Edit
                </button>
                <button class="delete-btn" onclick="deleteCourse('${course._id}')">
                    Delete
                </button>            `
        }

        card.innerHTML = `
            <h3>${course.coursePrefix} ~ ${course.courseName}</h3>
            <p>${course.description}</p>
            <p><strong>Credits:</strong> ${course.numberOfCredits}</p>
            ${buttons}
        `;

        container.appendChild(card);
    })
}

// Filter Functionality
function setupFilters() {
    const subjectFilter = document.getElementById("subjectFilter");
    const creditFilter = document.getElementById("creditFilter");

    subjectFilter.addEventListener("change", applyFilters);
    creditFilter.addEventListener("change", applyFilters);
}

function applyFilters() {
    const subjectValue = document.getElementById("subjectFilter").value;
    const creditValue = document.getElementById("creditFilter").value;

    const searchText = document.querySelector(".search__input")?.value.toLowerCase() || "";

    const filteredCourses = allCourses.filter(course => {
        const matchesSearch =
            course.coursePrefix.toLowerCase().includes(searchText) ||
            course.courseName.toLowerCase().includes(searchText) ||
            course.description.toLowerCase().includes(searchText);

        const matchesSubject = 
            subjectValue === "" || course.coursePrefix === subjectValue;

        const matchesCredits = 
            creditValue === "" || course.numberOfCredits.toString() === creditValue;

        return matchesSubject && matchesCredits && matchesSearch;
    });

    renderCourses(filteredCourses);
}

function populateSubjectFilter(courses) {
    const subjectFilter = document.getElementById("subjectFilter");

    // Clear exsisting options except "All Subjects"
    subjectFilter.innerHTML =   `<option value="">All Subjects</option>`;

    // Get unique subjects
    const subjects = [...new Set(courses.map(course => course.coursePrefix))];

    // Add options
    subjects.forEach(subject => {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectFilter.appendChild(option);
    })
}

// SEARCH FUNCTIONALITY
function setUpSearch() {
    const searchInput = document.querySelector(".search__input");

    if (!searchInput) return;

    searchInput.addEventListener("keyup", applyFilters);

    const searchButton = document.querySelector(".search__button");

    searchButton?.addEventListener("click", applyFilters);

}

// Add to schedule
function addToSchedule(courseId) {
    console.log("Add clicked:", courseId);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("Not logged in");
        return;
    }

    if (user.role.toLowerCase() !== "student") {
        alert("Only students can add courses.");
        return;
    }

    const cartKey = `cart_${user.username}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const course = allCourses.find(c => c._id === courseId);
    if (!course) {
        alert("Course not found");
        return;
    }

    if (cart.some(c => c._id === courseId)) {
        alert("Already added");
        return;
    }

    cart.push(course);
    localStorage.setItem(cartKey, JSON.stringify(cart));

    alert("Course added!");
}


function editCourse(courseId) {
    window.location.href = `editcourse.html?id=${courseId}`;
}

async function deleteCourse(courseId) {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try{
        fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (!response.ok) throw new Error("Failed to delete course");

        alert("Course deleted!");
        applyFilters(); // refresh list
    } catch (error) {
        console.error(error);
        alert("Error deleting course");
    }
}
