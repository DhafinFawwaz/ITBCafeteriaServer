import { db } from "../db.js";

export function register(req, res) {
    
    db.query(
        "INSERT INTO user (username, password, email, image) VALUES (?,?,?,?)",
        [req.body.username, req.body.password, req.body.email, req.body.image],
        (err, data) => {
            if (err) return res.json(err);
            res.json(req.body.username + " registered");
        }
    )
    
}
export function getAllUsers(req, res) {
    db.query(
        "SELECT * FROM user",
        (err, data) => {
            if (err) return res.json(err);
            res.json(data);
        }
    );
}