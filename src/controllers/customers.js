import express from "express"
import { getAllCustomers, createCustomer, getCustomerById, updateCustomerById, deleteCustomerById } from "../models/customers.js"

const customerController = express.Router()

customerController.get("/all", (request, response) => {
    getAllCustomers()
        .then(([results]) => {
            response.status(200).json(results)
        })
        .catch(error => {
            response.status(500).json(error)
        })
})


customerController.post("/create", (request, response) => {
    let customer = request.body

    createCustomer(
            customer.firstname,
            customer.lastname,
            customer.phone,
            customer.email,
            customer.street,
            customer.postcode,
            customer.city,
            customer.state
        )
        .then(([results]) => {
            response.status(200).json({ status: "Customer created", customer_id: results.insertId })
        })
        .catch(error => {
            response.status(500).json("failed to create customer")
            console.log(error)
        })

})

customerController.post("/update", (request, response) => {
    let customer = request.body

    updateCustomerById(customer.customer_id, customer.firstname, customer.lastname, customer.phone, customer.email, customer.street, customer.postcode, customer.city, customer.state)
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json("Customer updated")
            } else {
                response.status(404).json("Customer not found")
            }
        })
        .catch(error => {
            console.log("Failed to update customer - " + error)
            response.status(500).json("failed to update customer")
        })
})


customerController.post("/delete", (request, response) => {
    let customer_id = request.body.customer_id

    deleteCustomerById(customer_id)
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json("Customer deleted")
            } else {
                response.status(404).json("Customer not found")
            }
        })
        .catch(error => {
            console.log("Failed to delete customer - " + error)
            response.status(500).json("failed to delete customer")
        })
})

customerController.get("/:id", (request, response) => {
    getCustomerById(request.params.id)
        .then(([results]) => {
            if (results.length > 0) {
                response.status(200).json(results[0])
            } else {
                response.status(404).json("Customer not found")
            }
        })
        .catch(error => {
            console.log("failed to get customer by id - " + error)
            response.status(500).json("failed to get customer by id")
        })
})

export default customerController