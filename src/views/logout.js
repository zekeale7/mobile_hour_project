let logoutButton = document.getElementById("logout-button")

logoutButton.addEventListener("click", () => {
    fetch("/api/users/logout", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
        })
        .then(response => response.json())
        .then(responseJSON => {
            alert(responseJSON)
            window.location.href = "index.html"
        })
        .catch(error => {
            alert("Failed to logout user: " + error)
        })

})