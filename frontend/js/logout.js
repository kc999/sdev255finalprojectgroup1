localStorage.removeItem("isLoggedIn")
localStorage.removeItem("token")
localStorage.removeItem("username")
// if teacher flag is stored locally, 
// have to check to see if this is still the implementation before final release
localStorage.removeItem("teacher")

window.location.href = "/index.html"