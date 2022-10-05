// Insert role based navigation
let navElement = document.getElementById("nav-component")
if (navElement) {
    fetch("/api/users/status")
        .then(response => response.json())
        .then(response => {
            if (response.role == "admin") {
                navElement.innerHTML = `
                    <a href="/">Home</a>
                    <a href="/list_products_admin.html">Products</a>
                    <a href="/list_orders.html">Orders</a>
                    <a href="/list_customers.html">Customers</a>
                    <a href="/list_users.html">Users</a>
                    <a href="/list_changelog.html">Changelog</a>
                    <a href="/logout.html">Logout</a>
                `
            } else if (response.role == "employee") {
                navElement.innerHTML = `
                    <a href="/">Home</a>
                    <a href="/list_products_admin.html">Products</a>
                    <a href="/list_orders.html">Orders</a>
                    <a href="/list_customers.html">Customers</a>
                    <a href="/logout.html">Logout</a>
                `
            } else {
                navElement.innerHTML = `
                    <a href="/">Home</a>
                    <a href="/list_products_customer.html">Products</a>
                    <a href="/login.html">Login</a>
                `
            }
        })
}