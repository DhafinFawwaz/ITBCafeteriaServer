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
        UPDATE cart
        SET payment_method_id = ?, note = ?, modified_at = ?
        WHERE id = ?
        `,
        [req.body.payment_method_id, req.body.note, new Date(), req.body.id],
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

    // delete all order_item with cart_id = id
    const deleteOrderItemQuery = db.query(
        "DELETE FROM order_item WHERE cart_id = ?",
        [req.query.id],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    const deleteCartQuery = db.query(
        "DELETE FROM cart WHERE id = ?",
        [req.query.id],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    res.status(200).json({
        message: "success",
        data: req.query
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

export async function editCartStatus(req, res) {
    const editCartStatusQuery = await db.query(
        `
        UPDATE cart
        SET cart_status_id = ?, modified_at = ?
        WHERE id = ?
        `,
        [req.body.cart_status_id, new Date(), req.body.id],
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

export async function editPaymentStatus(req, res) {
    const editCartStatusQuery = await db.query(
        `
        UPDATE cart
        SET payment_status_id = ?, modified_at = ?
        WHERE id = ?
        `,
        [req.body.payment_status_id, new Date(), req.body.id],
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

export async function payCart(req, res) {
    // change status
    const editCartStatusQuery = await db.query(
        `
        UPDATE cart
        SET cart_status_id = ?, payment_status_id = ?, modified_at = ?
        WHERE id = ?
        `,
        [2, 2, new Date(), req.body.id],
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
