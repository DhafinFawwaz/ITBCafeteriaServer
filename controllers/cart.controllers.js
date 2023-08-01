import { db } from "../sql/db.js";

export async function addCart(req, res) {

    const addCartQuery = await db.query(
        "INSERT INTO cart (user_id, shop_id, payment_method_id, payment_status_id, cart_status_id, pickup_at, total_price, note, created_at, modified_at) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [req.body.user_id, req.body.shop_id, req.body.payment_method_id, 1, 1, req.body.pickup_at, 0, req.body.note, new Date(), new Date()],
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
    const editCartQuery = await db.query(
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
    const deleteCartQuery = db.query(
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

export async function getAllCart(req, res) {
    // Get all cart that is On Hold
    const getAllCartQuery = await db.query(
        `
        SELECT * FROM cart
        WHERE user_id = ? AND cart_status_id = 1
        `, 
        [req.query.user_id],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    res.status(200).json({
        message: "success",
        data: getAllCartQuery[0]
    });

}

