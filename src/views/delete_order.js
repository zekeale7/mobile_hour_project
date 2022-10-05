// get the user id from the query string (url) delete_user.html?user_id=?
let order_id = new URLSearchParams(window.location.search).get("order_id")

// if there's a user id in the query string we will load that user from the API
if (order_id) {
    fetch(`/api/orders/${order_id}`)
        .then(response => response.json())
        .then(order => {
            document.getElementById("order-details").innerHTML = `
                <p>Product ID: ${order.product_id}</p>
                <p>Customer ID: ${order.customer_id}</p>
                <p>Order Date: ${order.order_date}</p>    
            `
        })
}

// Handle delete button and redirect
let deleteButton = document.getElementById("delete-button")
deleteButton.addEventListener("click", () => {
    let order = { order_id: order_id }

    fetch("/api/orders/delete", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(order)
        })
        .then(response => response.json())
        .then(response => {
            alert(response)
            window.location.href = "/list_orders.html"
        })
        .catch(error => {
            alert("failed to delete order - " + error)
        })
})