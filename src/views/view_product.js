// get the product id from the query string (url) view_product.html?product_id=?
let product_id = new URLSearchParams(window.location.search).get("product_id")

// if there's a product id in the query string we will load that product from the API
if (product_id) {
    fetch(`/api/products/view/${product_id}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById("product-details").innerHTML = `
                <img src="/img/rotary_phone.jpg" alt="Rotary Phone">
                <section>
                    <p>${product.product_name}</p>
                    <p>${product.product_model}</p>
                    <p>${product.manufacturer}</p>
                </section>
            `

            fetch(`/api/features/view/${product.feature_id}`)
                .then(response => response.json())
                .then(features => {
                    document.getElementById("product-features").innerHTML = `
                        <ul>
                            <li>Weight: ${features.weight}</li>
                            <li>Dimensions: ${features.dimensions}</li>
                            <li>Screen Size: ${features.screensize}</li>
                            <li>Resolution: ${features.resolution}</li>
                            <li>CPU: ${features.CPU}</li>
                            <li>RAM: ${features.RAM}</li>
                            <li>CPU: ${features.CPU}</li>
                            <li>Storage: ${features.storage}</li>
                            <li>Battery: ${features.battery}</li>
                            <li>Rear-Camera: ${features.rear_camera}</li>
                            <li>Front-Camera: ${features.front_camera}</li>
                        <ul>
                    `
                })
        })
}