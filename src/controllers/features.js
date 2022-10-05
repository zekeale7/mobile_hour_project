import express from "express"
import { getFeaturesById, getAllFeatures, updateFeatureById } from "../models/features.js"

const featuresController = express.Router()

featuresController.get("/all", (request, response) => {
    getAllFeatures()
        .then(([results]) => {
            response.status(200).json(results)
        })
        .catch(error => {
            response.status(500).json(error)
        })
})


featuresController.post("/update", (request, response) => {
    let feature = request.body

    updateFeatureById(feature.feature_id, feature.weight, feature.dimensions, feature.screensize, feature.resolution, feature.CPU, feature.RAM, feature.storage, feature.battery, feature.rear_camera, feature.front_camera)
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json("Feature updated")
            } else {
                response.status(404).json("Feature not found")
            }
        })
        .catch(error => {
            console.log("Failed to update feature - " + error)
            response.status(500).json("failed to update feature")
        })
})



featuresController.get("/view/:id", (request, response) => {
    getFeaturesById(request.params.id)
        .then(([results]) => {
            if (results.length > 0) {
                response.status(200).json(results[0])
            } else {
                response.status(404).json("features not found")
            }
        })
        .catch(error => {
            console.log("failed to get features by id - " + error)
            response.status(500).json("failed to get features by id")
        })
})

export default featuresController