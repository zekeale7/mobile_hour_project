// get the user id from the query string (url) edit_user.html?user_id=?
let product_id = new URLSearchParams(window.location.search).get("product_id")

// if there's a user id in the query string we will load that user from the API
if (product_id) {
    fetch(`/api/products/view/${product_id}`)
        .then(response => response.json())
        .then(product => {
            // load the user data into the form
            document.getElementById("product_id").value = product.product_id
            document.getElementById("product_name").value = product.product_name
            document.getElementById("product_model").value = product.product_model
            document.getElementById("manufacturer").value = product.manufacturer
            document.getElementById("price").value = product.price
            document.getElementById("stock_on_hand").value = product.stock_on_hand
            document.getElementById("feature_id").value = product.feature_id

        })
}

// Send the updated user data back to the API on form submit
let editProductForm = document.getElementById("edit-product-form")

editProductForm.addEventListener("submit", (event) => {
    event.preventDefault()

    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(editProductForm)))

    fetch("/api/products/update", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: formDataJSON
        })
        .then(response => response.json())
        .then(responseJSON => {
            alert(responseJSON)
            window.location.href = "list_products_admin.html"
        })
        .catch(error => {
            alert("Failed to update products: " + error)
        })

})

