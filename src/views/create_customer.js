let createCustomerForm = document.getElementById("create-customer-form")

createCustomerForm.addEventListener("submit", (event) => {
    event.preventDefault()

    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createCustomerForm)))

    fetch("/api/customers/create", {
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
            alert("Failed to create customer: " + error)
        })

})