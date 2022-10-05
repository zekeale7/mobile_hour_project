//Load feature list
fetch("/api/features/all")
    .then(response => response.json())
    .then(featureList => {
        let featureListHTML = ``

        for (let feature of featureList) {
            featureListHTML += `
            <option value="${feature.feature_id}">
                ${feature.weight} 
                ${feature.dimensions}
                ${feature.screensize}
                ${feature.resolution}
                ${feature.CPU}
            </option
            `
        }
        document.getElementById("feature_list").innerHTML = featureListHTML
    })


let createProductForm = document.getElementById("create-product-form")

createProductForm.addEventListener("submit", (event) => {
    event.preventDefault()

    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createProductForm)))

    fetch("/api/products/create", {
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
            alert("Failed to create product: " + error)
        })

})