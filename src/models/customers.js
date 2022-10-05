import { db_conn } from "../database.js";

export function getAllCustomers() {
    return db_conn.query("SELECT * FROM customers")
}

export function getCustomerById(customer_id) {
    return db_conn.query("SELECT * FROM customers WHERE customer_id = ?", [customer_id])
}

export function createCustomer(firstname, lastname, phone, email, street, postcode, city, state) {
    return db_conn.query(
        "INSERT INTO customers (firstname, lastname, phone, email, street, postcode, city, state)" +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [firstname, lastname, phone, email, street, postcode, city, state]
    )
}

export function deleteCustomerById(customer_id) {
    return db_conn.query("DELETE FROM customers WHERE customer_id = ?", [customer_id])
}

export function updateCustomerById(customer_id, firstname, lastname, phone, email, street, postcode, city, state) {
    return db_conn.query(
        "UPDATE customers " +
        "SET firstname = ?, lastname = ?, phone = ?, email = ?, street = ?, postcode = ?, city = ?, state = ?" +
        "WHERE customer_id = ?", [firstname, lastname, phone, email, street, postcode, city, state, customer_id]
    )
}

export function getCustomerByLoginId(customer_id) {
    return db_conn.query("SELECT * FROM customers WHERE login_id = ?", [login_id])
}