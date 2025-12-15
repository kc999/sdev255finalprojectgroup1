// Load selected courses from backend or LocalStorage
document.addEventListener("DOMContentLoaded", loadCart);
updateNavBar() //from auth.js

function loadCart() {
    // When backend is implemented:
    // fetch("/api/student/courses")
    // .then(res => res.json())
    // .then(data => renderCart(data));

    // TEMP: localStorage fallback for testing
    const savedCourses = JSON.parse(localStorage.getItem("studentCart")) || [];

    renderCart(savedCourses);
}

function renderCart(courses) {
    const container = document.getElementById("cart-container");
    const emptyMsg = document.getElementById("empty-message");

    container.innerHTML = "";

    if (courses.length === 0) {
        emptyMsg.style.display = "block";
        return;
    } else {
        emptyMsg.style.display = "none";
    }

    courses.forEach((course, index) => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        card.innerHTML = `
            <h3>${course.name}</h3>
            <p><strong>Subject:</strong> ${course.subject}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Description:</strong> ${course.description}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        container.appendChild(card);
    });

    attachRemoveEvents(courses);
}

function attachRemoveEvents(courses) {
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index");

            courses.splice(index, 1);
            localStorage.setItem("studentCart", JSON.stringify(courses));
            renderCart(courses);
        })
    })
}