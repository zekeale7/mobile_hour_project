fetch("/api/orders/order_details")
    .then(response => response.json())
    .then(orderList => {
        let orderListHTML = ``

        for (let order of orderList) {
            orderListHTML += `
                <article class="data-row">
                    
                    <span>${order.product_id}</span>
                    <span>${order.customer_id}</span>
                    <span>${order.order_date}</span>
                  
                   
                    <a href="/edit_customer.html?customer_id=${order.order_id}">Edit</a>
                    <a href="/delete_order.html?order_id=${order.order_id}">Delete</a>
                </article>
            `
        }

        document.getElementById("order-list").innerHTML = orderListHTML
    })