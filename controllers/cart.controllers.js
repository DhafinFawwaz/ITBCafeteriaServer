import { db } from "../sql/db.js";

export async function addCart(req, res) {
    const addOrderQuery = await db.query(
        "INSERT INTO order_item (product_id, cart_id, quantity, note, created_at, modified_at) VALUES (?, ?, ?, ?, ?, ?)",
        [req.body.product_id, req.body.cart_id, req.body.quantity, req.body.note, new Date(), new Date()],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    res.status(200).json({
        message: "success",
        data: req.body
    });
}

export async function editCart(req, res) {
    const editOrderQuery = await db.query(
        `
        UPDATE order_item
        SET product_id = ?, cart_id = ?, quantity = ?, note = ?, modified_at = ?
        WHERE id = ?
        `,
        [req.body.product_id, req.body.cart_id, req.body.quantity, req.body.note, new Date(), req.body.id],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    res.status(200).json({
        message: "success",
        data: req.body
    });
}

export async function deleteCart(req, res) {
    const deleteOrderQuery = db.query(
        "DELETE FROM order_item WHERE id = ?",
        [req.body.id],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    res.status(200).json({
        message: "success",
        data: req.body
    });
}