import express from "express"
import session from "express-session"

const backend = express()
const port = 8080

// Enable parsing of JSON post body
backend.use(express.json())

// Enable session middleware. This gives us a session object that is
// persistent between requests, making our API stateful and overcoming
// the stateless nature of HTTP.
backend.use(session({
    secret: 'secret phrase abc123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Should be true once deployed online under HTTPS.
}))

// redirect web requests to the web root to the index.html
backend.get("/", (request, response) => {
    response.status(301).redirect("/index.html")
})

// Custom access control middleware
backend.use((request, response, next) => {
    // Define accessible routs for each user role
    const routes = {
        'unauthorised': [
            "/index.html",
            "/script.js",
            "/style.css",
            "/img",
            "/api/users/login",
            "/api/users/status",
            "/api/products/all",
            "/api/products/view",
            "/api/products/search",
            "/api/features/view",
            "/api/customers/create",
            "/api/orders/create",
            "/login",
            "/list_products_customer",
            "/view_product",
            "/buy_product"
        ],
        'admin': [
            "/index.html",
            "/script.js",
            "/style.css",
            "/img",
            "/logout",
            "/create_customer",
            "/list_customers",
            "/create_user",
            "/list_users",
            "/edit_customer",
            "/edit_user",
            "/delete_customer",
            "/delete_user",
            "/list_products_admin",
            "/create_product",
            "/list_order",
            "/delete_order",
            "/edit_product",
            "/delete_product",
            "/api"

        ],
        'employee': [
            "/index.html",
            "/script.js",
            "/style.css",
            "/img",
            "/api/users/logout",
            "/api/users/status",
            "/logout",
        ]
    }

    // Establish user role. First we assume the user is unauthorised
    // then we check the session, if the session exists, we get the
    // users role out of the session and store it for the next step.
    let user_role = "unauthorised"
    if (request.session.user != null) {
        user_role = request.session.user.role
    }

    // Check if the user role has routes defined for it
    if (user_role in routes) {
        const allowed_routes = routes[user_role]

        // Check if the requested url is a defined route for this user role
        if (allowed_routes.some(url => request.originalUrl.startsWith(url))) {
            // Allow the request to go through
            next()
        } else {
            // Stop the request and respond with forbidden
            response.status(403).json("access forbidden")
        }
    } else {
        // Stop the request and respond with not authenticated
        response.status(401).json("client not authenticated")
    }
})

// (Frontend) Serve static resources and views (HTML, CSS, JS, Images)
backend.use(express.static("src/static"))
backend.use(express.static("src/views"))

// (Backend) Serve API controllers
import usersController from "./controllers/users.js"
backend.use("/api/users", usersController)
import productController from "./controllers/products.js"
backend.use("/api/products", productController)
import featuresController from "./controllers/features.js"
backend.use("/api/features", featuresController)
import orderController from "./controllers/orders.js"
backend.use("/api/orders", orderController)
import customerController from "./controllers/customers.js"
backend.use("/api/customers", customerController)

// Start backend (Start listening for requests)
backend.listen(port, () => {
    console.log("Backend started on http://localhost:" + port)
})