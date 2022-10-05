import { db_conn } from "../database.js";

export function getAllProducts() {
    return db_conn.query("SELECT * FROM products")
}

export function getProductById(product_id) {
    return db_conn.query("SELECT * FROM products WHERE product_id = ?", [product_id])
}


export function createProduct(product_name, product_model, manufacturer, price, stock_on_hand, feature_id) {
    return db_conn.query(
        "INSERT INTO products (product_name, product_model, manufacturer, price, stock_on_hand, feature_id)" +
        "VALUES (?, ?, ?, ?, ?, ?)", [product_name, product_model, manufacturer, price, stock_on_hand, feature_id]
    )
}

export function updateProductById(product_id, product_name, product_model, manufacturer, price, stock_on_hand, feature_id) {
    return db_conn.query(
        "UPDATE products " +
        "SET product_name = ?, product_model = ?, manufacturer = ?, price = ?, stock_on_hand = ?, feature_id = ?" +
        "WHERE product_id = ?", [product_name, product_model, manufacturer, price, stock_on_hand, feature_id, product_id]
    )
}

export function deleteProductById(product_id) {
    return db_conn.query("DELETE FROM products WHERE product_id = ?", [product_id])
}

export function getProductsBySearch(search_term) {
    //search_term = "%" + search_term + "%"//
    search_term = `%${search_term}%`

    return db_conn.query("SELECT * FROM products WHERE product_name LIKE ? " +
        "OR product_model LIKE ? " +
        "OR manufacturer LIKE ?", [search_term, search_term, search_term])
}