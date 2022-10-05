import { db_conn } from "../database.js";

export function getAllOrders() {
    return db_conn.query("SELECT * FROM orders")
}

export function getOrderById(order_id) {
    return db_conn.query("SELECT * FROM orders WHERE order_id = ?", [order_id])
}

export function getOrderDetails() {
    return db_conn.query(`
        SELECT * 
        FROM orders
        INNER JOIN products 
        ON orders.product_id = products.product_id
        INNER JOIN customers
        ON orders.customer_id = customers.customer_id
    `)

}

export function createOrder(product_id, customer_id) {
    return db_conn.query(
        "INSERT INTO orders (product_id, customer_id, order_date)" +
        "VALUES (?, ?, ?)", [product_id, customer_id, new Date().toISOString().slice(0, 19).replace('T', ' ')]
    )
}

export function updateOrderById(order_id, product_id, customer_id, order_date) {
    return db_conn.query(
        "UPDATE orders " +
        "SET product_id, customer_id, order_date" +
        "WHERE order_id = ?", [product_id, customer_id, order_date, order_id]
    )
}

export function deleteOrderById(order_id) {
    return db_conn.query("DELETE FROM orders WHERE order_id = ?", [order_id])
}