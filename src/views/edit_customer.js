// get the user id from the query string (url) edit_user.html?user_id=?
let customer_id = new URLSearchParams(window.location.search).get("customer_id")

// if there's a user id in the query string we will load that user from the API
if (customer_id) {
    fetch(`/api/customers/${customer_id}`)
        .then(response => response.json())
        .then(customer => {
            // load the user data into the form
            document.getElementById("customer_id").value = customer.customer_id
            document.getElementById("firstname").value = customer.firstname
            document.getElementById("lastname").value = customer.lastname
            document.getElementById("phone").value = customer.phone
            document.getElementById("email").value = customer.email
            document.getElementById("street").value = customer.street
            document.getElementById("postcode").value = customer.postcode
            document.getElementById("city").value = customer.city
            document.getElementById("state").value = customer.state
        })
}

// Send the updated user data back to the API on form submit
let editCustomerForm = document.getElementById("edit-customer-form")

editCustomerForm.addEventListener("submit", (event) => {
    event.preventDefault()

    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(editCustomerForm)))

    fetch("/api/customers/update", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: formDataJSON
        })
        .then(response => response.json())
        .then(responseJSON => {
            alert(responseJSON)
            window.location.href = "list_customers.html"
        })
        .catch(error => {
            alert("Failed to update customer: " + error)
        })

})