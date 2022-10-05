fetch("/api/customers/all")
    .then(response => response.json())
    .then(customerList => {
        let customerListHtml = ``

        for (let customer of customerList) {
            customerListHtml += `
                <article class="data-row">
                    <span>${customer.firstname} ${customer.lastname}</span>
                    <span>${customer.phone}</span>
                    <span>${customer.email}</span>
                    <span>${customer.street}</span>
                    <span>${customer.postcode}</span>
                    <span>${customer.city}</span>
                    <span>${customer.state}</span>
                   
                    <a href="/edit_customer.html?customer_id=${customer.customer_id}">Edit</a>
                    <a href="/delete_customer.html?customer_id=${customer.customer_id}">Delete</a>
                </article>
            `
        }

        document.getElementById("customer-list").innerHTML = customerListHtml
    })