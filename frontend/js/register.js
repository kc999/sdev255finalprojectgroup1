addEventListener("DOMContentLoaded", function(){
    document.querySelector("#registerBtn").addEventListener("click", register);
    document.querySelector("#deleteBtn").addEventListener("click", deleteUser);
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

async function deleteUser(){
    const username = document.querySelector("#username").value
    const response = await fetch("http://localhost:3000/api/delete/" + username, {
        method: "DELETE"
    })
    if (response.ok) {
        alert("Deleted successfully")
    }
    else {
        document.querySelector("#errorMsg").innerHTML = "Error trying to delete";
    }
}