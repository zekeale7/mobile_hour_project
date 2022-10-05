// get the user id from the query string (url) delete_user.html?user_id=?
let user_id = new URLSearchParams(window.location.search).get("user_id")

// if there's a user id in the query string we will load that user from the API
if (user_id) {
    fetch(`/api/users/${user_id}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById("user-details").innerHTML = `
                <p>Name: ${user.firstname} ${user.lastname}</p>
                <p>Username: ${user.username}</p>
                <p>Role: ${user.role}</p>  
            `
        })
}

// Handle delete button and redirect
let deleteButton = document.getElementById("delete-button")
deleteButton.addEventListener("click", () => {
    let user = { user_id: user_id }

    fetch("/api/users/delete", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(response => {
            alert(response)
            window.location.href = "/list_users.html"
        })
        .catch(error => {
            alert("failed to delete user - " + error)
        })
})