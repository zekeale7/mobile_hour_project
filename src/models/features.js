import { db_conn } from "../database.js";

export function getFeaturesById(feature_id) {
    return db_conn.query("SELECT * FROM features WHERE feature_id = ?", [feature_id])
}

export function getAllFeatures() {
    return db_conn.query("SELECT * FROM features")
}

export function createFeatures(weight, dimensions, screensize, resolution, CPU, RAM, storage, battery, rear_camera, front_camera) {
    return db_conn.query(
        "INSERT INTO features (weight, dimensions, screensize, resolution, CPU, RAM, storage, battery, rear_camera, front_camera)" +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [weight, dimensions, screensize, resolution, CPU, RAM, storage, battery, rear_camera, front_camera]
    )
}

export function deleteFeatureById(feature_id) {
    return db_conn.query("DELETE FROM features WHERE feature_id = ?", [feature_id])
}

export function updateFeatureById(feature_id, weight, dimensions, screensize, resolution, CPU, RAM, storage, battery, rear_camera, front_camera) {
    return db_conn.query(
        "UPDATE features " +
        "SET weight = ?, dimensions = ?, screensize = ?, resolution = ?, CPU = ?, RAM = ?, storage = ?, battery = ?, rear_camera = ?, front_camera = ?" +
        "WHERE feature_id = ?", [weight, dimensions, screensize, resolution, CPU, RAM, storage, battery, rear_camera, front_camera, feature_id]
    )
}



// TODO: Create, Read all, Update, Delete...