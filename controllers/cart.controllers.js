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
    // get all order item with cart_id = cart.id
    // get all product with id = order_item.product_id
    // get all shop with id = cart.shop_id

    // result will be
    /*
    {[
        {
            user_id: 1,
            shop_id: 1,
            shop_name: "shop_name",
            shop_image: "shop_image",
            payment_method_id: 1,
            payment_status_id: 1,
            cart_status_id: 1,
            pickup_at: "2021-01-01 00:00:00",
            total_price: 0,
            note: "note",
            order_item: [
                {
                    product_id: 1,
                    cart_id: 1,
                    quantity: 1,
                    product_name: "product_name",
                    product_price: 0,
                    product_image: "product_image"
                }
            ]
        }
        
    ]}
    */

    const getAllCartQuery = await db.query(
        `
        SELECT
            c.user_id,
            c.shop_id,
            s.username AS shop_name,
            s.image AS shop_image,
            c.payment_method_id,
            c.payment_status_id,
            c.cart_status_id,
            c.pickup_at,
            c.total_price,
            c.note,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'order_item_id', oi.id, 
                    'product_id', p.id,
                    'cart_id', oi.cart_id,
                    'quantity', oi.quantity,
                    'product_name', p.name,
                    'product_price', p.price,
                    'product_image', p.image
                )
            ) AS order_item
        FROM cart c
        JOIN shop s ON c.shop_id = s.id
        JOIN order_item oi ON c.id = oi.cart_id
        JOIN product p ON oi.product_id = p.id
        WHERE c.cart_status_id = 1 AND c.user_id = ?
        GROUP BY c.id;
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
    console.log(`${req.query.user_id} paid some carts`);
    const editCartStatusQuery = await db.query(
        `
        UPDATE cart
        SET cart_status_id = ?, payment_status_id = ?, modified_at = ?
        WHERE cart_status_id = 1 AND user_id = ?
        `,
        [2, 2, new Date(), req.query.user_id],
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
