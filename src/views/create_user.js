let createUserForm = document.getElementById("create-user-form")

createUserForm.addEventListener("submit", (event) => {
    event.preventDefault()

    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createUserForm)))

    fetch("/api/users/create", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: formDataJSON
        })
        .then(response => response.json())
        .then(responseJSON => {
            alert(responseJSON)
            window.location.href = "list_users.html"
        })
        .catch(error => {
            alert("Failed to create user: " + error)
        })

})