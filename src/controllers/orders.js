import express from "express";
import { createOrder, getAllOrders, getOrderById, getOrderDetails, updateOrderById, deleteOrderById } from "../models/orders.js";


const orderController = express.Router()

orderController.get("/all", (request, response) => {
    getAllOrders()
        .then(([results]) => {
            response.status(200).json(results)
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

orderController.get("/order_details", (request, response) => {
    getOrderDetails()
        .then(([results]) => {
            response.status(200).json(results)
        })
        .catch(error => {
            response.status(500).json("Failed to get all orders with details")
            console.log(error)
        })
})

orderController.post("/create", (request, response) => {
    let order = request.body

    createOrder(order.product_id, order.customer_id)
        .then(([results]) => {
            response.status(200).json({ status: "order created", order_id: results.insertId })
        })
        .catch(error => {
            response.status(500).json("failed to create order")
            console.log(error)
        })
})

orderController.post("/update", (request, response) => {
    let order = request.body

    updateOrderById(
            order.order_id,
            order.product_id,
            order.customer_id,
            order.order_date
        )
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json("Order updated")
            } else {
                response.status(404).json("Order not found")
            }
        })
        .catch(error => {
            console.log("Failed to update order - " + error)
            response.status(500).json("failed to update order")
        })
})

orderController.post("/delete", (request, response) => {
    let order_id = request.body.order_id

    deleteOrderById(order_id)
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json("Order deleted")
            } else {
                response.status(404).json("Order not found")
            }
        })
        .catch(error => {
            console.log("Failed to delete order - " + error)
            response.status(500).json("failed to delete order")
        })
})


orderController.get("/view/:id", (request, response) => {
    getOrderById(request.params.id)
        .then(([results]) => {
            if (results.length > 0) {
                response.status(200).json(results[0])
            } else {
                response.status(404).json("Order not found")
            }
        })
        .catch(error => {
            console.log("failed to get order by id - " + error)
            response.status(500).json("failed to get order by id")
        })
})

export default orderController