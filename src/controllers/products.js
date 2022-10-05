import express from "express"
import { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById, getProductsBySearch } from "../models/products.js"

const productController = express.Router()


productController.get("/all", (request, response) => {
    getAllProducts()
        .then(([results]) => {
            response.status(200).json(results)
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

productController.post("/create", (request, response) => {
    let product = request.body

    createProduct(
            product.product_name,
            product.product_model,
            product.manufacturer,
            product.price,
            product.stock_on_hand,
            product.feature_id
        )
        .then(([results]) => {
            response.status(200).json("Product created " + results.insertId)
        })
        .catch(error => {
            response.status(500).json("failed to create product")
            console.log(error)
        })
})

productController.post("/update", (request, response) => {
    let product = request.body

    updateProductById(
            product.product_id,
            product.product_name,
            product.product_model,
            product.manufacturer,
            product.price,
            product.stock_on_hand,
            product.feature_id

        )
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json("Product updated")
            } else {
                response.status(404).json("Product not found")
            }
        })
        .catch(error => {
            console.log("Failed to update product - " + error)
            response.status(500).json("failed to update product")
        })
})

productController.post("/delete", (request, response) => {
    let product_id = request.body.product_id

    deleteProductById(product_id)
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json("Product deleted")
            } else {
                response.status(404).json("Product not found")
            }
        })
        .catch(error => {
            console.log("Failed to delete product - " + error)
            response.status(500).json("failed to delete product")
        })
})

productController.get("/view/:id", (request, response) => {
    getProductById(request.params.id)
        .then(([results]) => {
            if (results.length > 0) {
                response.status(200).json(results[0])
            } else {
                response.status(404).json("product not found")
            }
        })
        .catch(error => {
            console.log("failed to get product by id - " + error)
            response.status(500).json("failed to get product by id")
        })
})

productController.get("/search/:search_term", (request, response) => {
    getProductsBySearch(request.params.search_term)
        .then(([results]) => {
            if (results.length > 0) {
                response.status(200).json(results)
            } else {
                response.status(404).json("Search term not found")
            }
        })
        .catch(error => {
            console.log("Failed to search products " + error)
            response.status(500).json("Failed to search products")
        })
})

export default productController