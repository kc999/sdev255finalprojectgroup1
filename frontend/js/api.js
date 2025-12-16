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

        card.innerHTML = `
            <h3>${course.coursePrefix} ~ ${course.courseName}</h3>
            <p>${course.description}</p>
            <p><strong>Credits:</strong> ${course.numberOfCredits}</p>
            <button class="add-btn" onclick="addToSchedule('${course._id}')">
                Add to Schedule
            </button>
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
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user) return window.location.href = "login.html";

    if (user.role !== "student") {
        alert("Only students can add courses to their schedule.");
        return;
    }

    const scheduleKey = "schedule_" + user.id;
    const schedule = JSON.parse(localStorage.getItem(scheduleKey)) || [];

    if (schedule.includes(courseId)) {
        alert("Course is already in your schedule.");
        return;
    }

    schedule.push(courseId);
    localStorage.setItem(scheduleKey, JSON.stringify(schedule));

    alert("Course add to your cart");
}

