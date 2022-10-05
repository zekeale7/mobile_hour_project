fetch("/api/products/all")
    .then(response => response.json())
    .then(productList => {
        let productListHTML = ``

        for (let product of productList) {
            productListHTML += `
                <article class="data-row">
                    <span>${product.product_name}</span>
                    <span>${product.product_model}</span>
                    <span>${product.manufacturer}</span>
                    <span>${product.price}</span>
                    <span>${product.stock_on_hand}</span>
                    

                    <a href="/edit_product.html?product_id=${product.product_id}">Edit</a>
                    <a href="/delete_product.html?product_id=${product.product_id}">Delete</a>
                </article>
            `
        }

        document.getElementById("product-list").innerHTML = productListHTML
    })

