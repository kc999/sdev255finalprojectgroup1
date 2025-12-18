document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "Student") {
        window.location.href = "login.html";
        return;
    }

    renderCart();
})

function renderCart() {
    const user = JSON.parse(localStorage.getItem("user"));
    const cartKey = `cart_${user.username}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const container = document.getElementById("cart-container");
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        card.innerHTML = `
            <h3>${course.coursePrefix} — ${course.courseName}</h3>
            <p>${course.description}</p>
            <p><strong>Credits:</strong> ${course.numberOfCredits}</p>
            <button class="remove-btn" onclick="removeFromCart('${course._id}')">
                Remove
            </button>
        `;

        container.appendChild(card);
    });
}

async function removeFromCart(courseId) {
    const user = JSON.parse(localStorage.getItem("user"));
    const cartKey = `cart_${user.username}`;
    const token = user.token;

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    cart = cart.filter(course => course._id !== courseId);
    try {
        //Remove course from database
        const response = await fetch("http://localhost:3000/api/users/remove-course", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                token: token,
                course: courseId
            })
        });
        if (response.ok)
        {   
            localStorage.setItem(cartKey, JSON.stringify(cart));
            alert("Course removed from cart successfully.")
            renderCart();
        }
    }
    catch(err)
    {
        console.log(err)
    }
   
}