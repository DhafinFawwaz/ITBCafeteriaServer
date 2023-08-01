import { db } from "../sql/db.js";
import "../util/date.util.js";

export async function addOrder(req, res) {

    // Create new cart if no available cart
    // check if cart with shop_id exist and cart_status is In Progress
    // if not exist, then create a new cart with shop_id.
    // if exist, then get the id, put it in the cart_id of addOrderQuery

    const checkCartQuery = await db.query(
        `
        SELECT id
        FROM cart
        WHERE shop_id = ? AND cart_status_id = 1
        LIMIT 1
        `,
        [req.body.shop_id],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    if(checkCartQuery[0][0] == undefined) {
        const addCartQuery = await db.query(
            "INSERT INTO cart (user_id, shop_id, payment_method_id, payment_status_id, cart_status_id, pickup_at, total_price, note, created_at, modified_at) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [req.body.user_id, req.body.shop_id, 1, 1, 1, new Date().getAutoPickUpTime(), 0, "", new Date(), new Date()],
            (error, result) => {
                if(error) {
                    console.log(error);
                    return next(error.message);
                }
            }
        );
        req.body.cart_id = addCartQuery[0].insertId;
    }
    else {
        req.body.cart_id = checkCartQuery[0][0].id;
    }

    // Check if order_item already exist
    // if exist, just increase the quantity
    // if not exist, then create a new order_item

    const checkOrderQuery = await db.query(
        `
        SELECT id, quantity
        FROM order_item
        WHERE product_id = ? AND cart_id = ?
        LIMIT 1
        `,
        [req.body.product_id, req.body.cart_id],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    if(checkOrderQuery[0][0] == undefined) {
        const addOrderQuery = await db.query(
            "INSERT INTO order_item (product_id, cart_id, quantity, created_at, modified_at) VALUES (?, ?, ?, ?, ?)",
            [req.body.product_id, req.body.cart_id, 1, new Date(), new Date()],
            (error, result) => {
                if(error) {
                    console.log(error);
                    return next(error.message);
                }
            }
        );
    } else {
        const editOrderQuery = await db.query(
            `
            UPDATE order_item
            SET quantity = ?, modified_at = ?
            WHERE id = ?
            `,
            [checkOrderQuery[0][0].quantity + 1, new Date(), checkOrderQuery[0][0].id],
            (error, result) => {
                if(error) {
                    console.log(error);
                    return next(error.message);
                }
            }
        );
    }

    // Find total_price of cart
    const findTotalPriceQuery = await db.query(
        `
        SELECT SUM(product.price * order_item.quantity) AS total_price
        FROM order_item
        INNER JOIN product ON order_item.product_id = product.id
        WHERE order_item.cart_id = ?
        `,
        [req.body.cart_id],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    req.body.total_price = findTotalPriceQuery[0][0].total_price;

    // Update total_price in cart
    const updateTotalPriceQuery = await db.query(
        `
        UPDATE cart
        SET total_price = ?, modified_at = ?
        WHERE id = ?
        `,
        [req.body.total_price, new Date(), req.body.cart_id],
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

export async function editOrder(req, res) {

    if(req.body.quantity < 1) {
        return res.status(200).json({
            message: "Quantity must be greater than 0",
            data: req.body
        });
    }

    const editOrderQuery = await db.query(
        `
        UPDATE order_item
        SET quantity = ?, note = ?, modified_at = ?
        WHERE id = ?
        `,
        [req.body.quantity, req.body.note, new Date(), req.body.id],
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

export async function deleteOrder(req, res) {
    const deleteOrderQuery = db.query(
        "DELETE FROM order_item WHERE id = ?",
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
        data: req.body
    });
}