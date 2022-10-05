// get the user id from the query string (url) delete_user.html?user_id=?
let product_id = new URLSearchParams(window.location.search).get("product_id")

// if there's a user id in the query string we will load that user from the API
if (product_id) {
    fetch(`/api/products/${product_id}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById("product-details").innerHTML = `
            <span>${product.product_name}</span>
            <span>${product.product_model}</span>
            <span>${product.manufacturer}</span>
            <span>${product.price}</span>
            <span>${product.stock_on_hand}</span>
            `
        })
}

// Handle delete button and redirect
let deleteButton = document.getElementById("delete-button")
deleteButton.addEventListener("click", () => {
    let product = { product_id: product_id }

    fetch("/api/products/delete", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(response => {
            alert(response)
            window.location.href = "/list_products_admin.html"
        })
        .catch(error => {
            alert("failed to delete product - " + error)
        })
})