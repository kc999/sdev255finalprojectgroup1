
function updateNavBar() {
    const user = JSON.parse(localStorage.getItem("user"));

    const loginLink = document.getElementById("login-link");
    const userInfo = document.getElementById("user-info");
    const usernameDisplay = document.getElementById("username-display");

    if (user) {
        loginLink.style.display = "none";
        userInfo.style.display = "flex";
        usernameDisplay.textContent = `${user.name} (${user.role})`;
    } else {
        loginLink.style.display = "block";
        userInfo.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.reload();
        });
    }
});