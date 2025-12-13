addEventListener("DOMContentLoaded", function(){
    document.querySelector("#registerBtn").addEventListener("click", register);
})


async function register(){
    const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "name": document.querySelector("#name").value,
            "username": document.querySelector("#username").value,
            "password": document.querySelector("#password").value,
            "role": document.querySelector("#role").value
        })
    })

    if (response.ok) {
        alert("Registered successfully")
    }
    else {
       document.querySelector("#errorMsg").innerHTML = "Error trying to register";
    }
}

