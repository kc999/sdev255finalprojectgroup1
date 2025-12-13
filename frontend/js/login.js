addEventListener("DOMContentLoaded", function(){
    document.querySelector("#loginBtn").addEventListener("click", login);
})


async function login(e){
    e.preventDefault()
    const username = document.querySelector("#uname").value
    const password = document.querySelector("#psword").value
    console.log(username)
    try
    {
    const response = await fetch("http://localhost:3000/api/login", {
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
    } 
    else 
    {
        console.log("oops")
    }
    }
    catch(error)
    {
        console.log(error)
    }
}


