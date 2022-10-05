fetch("/api/users/all")
    .then(response => response.json())
    .then(userList => {
        let userListHtml = ``

        for (let user of userList) {
            userListHtml += `
                <article class="data-row">
                    <span>${user.firstname} ${user.lastname}</span>
                    <span>${user.username}</span>
                    <span>${user.role}</span>
                    <a href="/edit_user.html?user_id=${user.user_id}">Edit</a>
                    <a href="/delete_user.html?user_id=${user.user_id}">Delete</a>
                </article>
            `
        }

        document.getElementById("user-list").innerHTML = userListHtml
    })