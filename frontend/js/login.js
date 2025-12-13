let token


//this queryselector only works if the script in login.html is deferred, please keep in mind!
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

        //save token and values
        //the JSON data for user must be converted to a string, as localStorage only accepts one (key,value) pair
        userInfo = JSON.stringify(tokenResponse)
        localStorage.setItem("user", userInfo)
        // can store a token if we want to separate authorization from user existence/values
        localStorage.setItem("token", tokenResponse.token)

        //redirects to home after login
        window.location.replace("index.html")
    } else {
        document.querySelector("errorMsg").innerHTML = "Bad username or password"
    }
}