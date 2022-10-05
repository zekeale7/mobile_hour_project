import { getAllUsers, createUser, getUserById, getUserByUsername, updateUserById, deleteUserById } from "../models/users.js";
import express from "express";
import bcrypt from "bcrypt"
import validator from "validator"

const usersController = express.Router()

usersController.get("/all", (request, response) => {
    getAllUsers()
        .then(([results]) => {
            response.status(200).json(results)
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

usersController.post("/create", (request, response) => {
    let user = request.body

    if (!validator.isAlpha(user.firstname)) {
        response.status(400).json("invalid firstname")
        return
    }

    //Do for all inputs

    let encrypted_password = bcrypt.hashSync(user.password, 6)

    createUser(
            validator.escape(user.firstname),
            user.lastname,
            user.role,
            user.username,
            encrypted_password
        )
        .then(([results]) => {
            response.status(200).json("user created with id " + results.insertId)
        })
        .catch(error => {
            response.status(500).json("failed to create user")
            console.log(error)
        })
})

usersController.post("/update", (request, response) => {
    let user = request.body

    // If the password is not encrypted, encrypt it.
    let encrypted_password = user.password
    if (!user.password.startsWith("$")) {
        encrypted_password = bcrypt.hashSync(user.password, 6)
    }

    updateUserById(user.user_id, user.firstname, user.lastname, user.role, user.username, encrypted_password)
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json("user updated")
            } else {
                response.status(404).json("user not found")
            }
        })
        .catch(error => {
            console.log("Failed to update user - " + error)
            response.status(500).json("failed to update user")
        })
})

usersController.post("/delete", (request, response) => {
    let user_id = request.body.user_id

    deleteUserById(user_id)
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json("user deleted")
            } else {
                response.status(404).json("user not found")
            }
        })
        .catch(error => {
            console.log("Failed to delete user - " + error)
            response.status(500).json("failed to delete user")
        })
})

usersController.post("/login", (request, response) => {
    let login_details = request.body

    getUserByUsername(login_details.username)
        .then(([results]) => {
            if (results.length > 0) {
                // get the first matching user
                let user = results[0]

                // check if the password matches the one in the database
                if (bcrypt.compareSync(login_details.password, user.password)) {
                    // setup the session to login the user
                    request.session.user = {
                        user_id: user.user_id,
                        role: user.role,
                    }

                    response.status(200).json("login successful")
                } else {
                    response.status(400).json("login unsuccessful")
                }
            } else {
                response.status(404).json("user not found")
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).json("login error")
        })
})

usersController.get("/status", (request, response) => {
    if (request.session.user != null) {
        response.status(200).json({
            role: request.session.user.role
        })
    } else {
        response.status(200).json({
            role: "unauthorised"
        })
    }
})

usersController.post("/logout", (request, response) => {
    request.session.destroy()
    response.status(200).json("logged out")
})

usersController.get("/:id", (request, response) => {
    getUserById(request.params.id)
        .then(([results]) => {
            if (results.length > 0) {
                response.status(200).json(results[0])
            } else {
                response.status(404).json("user not found")
            }
        })
        .catch(error => {
            console.log("failed to get user by id - " + error)
            response.status(500).json("failed to get user by id")
        })
})

export default usersController