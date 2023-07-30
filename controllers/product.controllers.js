import { db } from "../sql/db.js";
import { insertProductTableSQL } from "../sql/sql.js";

export function addProduct(req, res) {
    console.log(req.headers.authorization);
    

    db.query(
        insertProductTableSQL,
        [req.body.user_id, req.body.name, req.body.description, req.body.price],
        (err, data) => {
            if (err) return res.json(err);
            res.json(req.body.name + " added");
        }
    )
}

export function editProduct(req, res) {
    
}

export function deleteProduct(req, res) {
    
}