// get the user id from the query string (url) delete_user.html?user_id=?
let customer_id = new URLSearchParams(window.location.search).get("customer_id")

// if there's a user id in the query string we will load that user from the API
if (customer_id) {
    fetch(`/api/customers/${customer_id}`)
        .then(response => response.json())
        .then(customer => {
            document.getElementById("customer-details").innerHTML = `
                <p>Name: ${customer.firstname} ${customer.lastname}</p>
                <p>Phone: ${customer.phone}</p>
                <p>Email: ${customer.email}</p>  
                <p>Street: ${customer.street}</p>  
                <p>Postcode: ${customer.postcode}</p>  
                <p>City: ${customer.city}</p> 
                <p>State: ${customer.state}</p>   
            `
        })
}

// Handle delete button and redirect
let deleteButton = document.getElementById("delete-button")
deleteButton.addEventListener("click", () => {
    let customer = { customer_id: customer_id }

    fetch("/api/customers/delete", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(customer)
        })
        .then(response => response.json())
        .then(response => {
            alert(response)
            window.location.href = "/list_customers.html"
        })
        .catch(error => {
            alert("failed to delete customer - " + error)
        })
})