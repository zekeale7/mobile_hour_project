import { db_conn } from "../database.js";

export function getStaffByLoginID(login_id) {
    return db_conn.query("SELECT * from staff WHERE login_id = ?", [login_id]);
}