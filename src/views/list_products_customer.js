fetch("/api/products/all")
    .then(response => response.json())
    .then(productList => {
        let productListHTML = ``

        for (let product of productList) {
            productListHTML += `
                <article class="data-cell product-card">
                    <img src="/img/rotary_phone.jpg" alt="Rotary Phone">
                    <span>${product.product_name}</span>
                    <span>${product.product_model}</span>
                    <span>${product.manufacturer}</span>
                    <a href="/view_product.html?product_id=${product.product_id}">View</a>
                    <a href="/buy_product.html?product_id=${product.product_id}">Buy</a>
                </article>
            `
        }

        document.getElementById("product-list").innerHTML = productListHTML
    })

searchButton = document.getElementById("search")
searchTermsInput = document.getElementById("search-term")

searchButton.addEventListener("click", () => {
    fetch("/api/products/search/" + searchTermsInput.value)
        .then(response => response.json())
        .then(productList => {
            let productListHTML = ``

            for (let product of productList) {
                productListHTML += `
                    <article class="data-cell product-card">
                        <img src="/img/rotary_phone.jpg" alt="Rotary Phone">
                        <span>${product.product_name}</span>
                        <span>${product.product_model}</span>
                        <span>${product.manufacturer}</span>
                        <a href="/view_product.html?product_id=${product.product_id}">View</a>
                        <a href="/buy_product.html?product_id=${product.product_id}">Buy</a>
                    </article>
                `
            }

            document.getElementById("product-list").innerHTML = productListHTML
        })
})