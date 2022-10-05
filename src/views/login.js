let loginUserForm = document.getElementById("login-user-form")

loginUserForm.addEventListener("submit", (event) => {
    event.preventDefault()

    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(loginUserForm)))

    fetch("/api/users/login", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: formDataJSON
        })
        .then(response => {
            if (response.status == 200) {
                alert("Login successful!")
                window.location.href = "list_users.html"
            } else if (response.status == 400) {
                alert("Login failed!")
            } else {
                alert("Login error!")
            }
        })
        .catch(error => {
            alert("Failed to login user: " + error)
        })
})