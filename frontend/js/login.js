let token

document.querySelector("#loginBtn").addEventListener("click", async function(){
    //grab our data from the form
    const username = document.querySelector("#uname").value
    const password = document.querySelector("#psword").value

    login(username,password)

})


async function login(username, password){
    // Remove any previous error message
    document.querySelector(".error").innerHTML = "";
    
    const response = await fetch("http://localhost:3000/api/auth",{
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "username": username,
            "password": password
        })
    })

    if(response.ok){
        // take the token and save it to storage
        const tokenResponse = await response.json()
        console.log(tokenResponse)

        //save token
        localStorage.setItem("token", tokenResponse.token)
        localStorage.setItem("username", tokenResponse.username)
        localStorage.setItem("isLoggedIn", "true")

        //redirect
        window.location.replace("index.html")
    } else {
        document.querySelector("errorMsg").innerHTML = "Bad username or password"
    }
}