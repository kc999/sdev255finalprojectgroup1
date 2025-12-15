document.addEventListener("DOMContentLoaded", () => {
    updateNavBar(); // from auth.js
    loadCourses();
    setupFilters();
});

// Store all courses globally for search use
let allCourses = [];

// Load courses (mock or backend)
function loadCourses() {
    const container = document.getElementById("courses-container");

    // Example Mock Data
    allCourses = JSON.parse(localStorage.getItem("courses")) || [
        {
            id: "CSE101",
            name: "Intro to Computer Science",
            subject: "CSE",
            number: "101",
            credits: 3,
            description: "Learn programming basics"
        },
        {
            id: "MAT201",
            name: "Calculus I",
            subject: "MAT",
            number: "201",
            credits: 4,
            description: "Limits, derivatives, integrals"
        },
        {
            id: "CSE101",
            name: "Intro to Computer Science",
            subject: "CSE",
            number: "101",
            credits: 3,
            description: "Learn programming basics"
        },
        {
            id: "MAT201",
            name: "Calculus I",
            subject: "MAT",
            number: "201",
            credits: 4,
            description: "Limits, derivatives, integrals"
        },
        {
            id: "CSE101",
            name: "Intro to Computer Science",
            subject: "CSE",
            number: "101",
            credits: 3,
            description: "Learn programming basics"
        },
        {
            id: "MAT201",
            name: "Calculus I",
            subject: "MAT",
            number: "201",
            credits: 4,
            description: "Limits, derivatives, integrals"
        }
    ];

    renderCourses(allCourses);
}

// Render cards to page
function renderCourses(courses) {
    const container = document.getElementById("courses-container");
    container.innerHTML = "";

    if (courses.length === 0) {
        container.innerHTML = "<p>No courses match your search.</p>";
        return;
    }

    courses.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        card.innerHTML = `
            <h3>${course.subject} ${course.number} — ${course.name}</h3>
            <p>${course.description}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>

            <button class="add-btn" onclick="addToSchedule('${course.id}')">
                Add to Schedule
            </button>
        `;

        container.appendChild(card);
    });
}

// Filters Functionality
function setupFilters() {
    const subjectFilter = document.getElementById("subjectFilter");
    const creditFilter = document.getElementById("creditFilter");

    subjectFilter.addEventListener("change", applyFilters);
    creditFilter.addEventListener("change", applyFilters);
}

function applyFilters() {
    const subject = document.getElementById("subjectFilter").value;
    const credits = document.getElementById("creditFilter").value;
    
    let filtered = allCourses.filter(course => {
        const matchesSubject = 
            subject === "" || course.subject === subject;

        const matchesCredits = 
            credits === "" || course.credits.toString() === credits;

        return matchesSubject && matchesCredits;
    });

    renderCourses(filtered);
}

// SEARCH FUNCTIONALITY
const searchInput = document.querySelector(".search__input");

searchInput.addEventListener("keyup", function () {
    const query = searchInput.value.toLowerCase();

    const filtered = allCourses.filter(course =>
        course.name.toLowerCase().includes(query) ||
        course.subject.toLowerCase().includes(query) ||
        course.number.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.credits.toString().includes(query)
    );

    renderCourses(filtered);
});

// Add to schedule
function addToSchedule(courseId) {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.role)
    if (!user) return window.location.href = "login.html";

    if (user.role !== "Student") {
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

    alert("Course added to your schedule.");
}
