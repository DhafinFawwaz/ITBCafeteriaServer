import { db } from "../sql/db.js";

export async function addProduct(req, res) {
    const addProductQuery = await db.query(
        "INSERT INTO product (shop_id, location_id, category_id, name, description, price, quantity, image, created_at, modified_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [req.body.shop_id, req.body.location_id, req.body.category_id, req.body.name, req.body.description, req.body.price, req.body.quantity, req.body.image, new Date(), new Date(), null],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    res.status(200).json({
        message: "Product added successfully",
        data: req.body
    });

    // Save the image in separate database
}

export async function findProduct(req, res) {


}

export async function detailsProduct(req, res) {
    const detailsProductQuery = await db.query(
        `SELECT * FROM product WHERE id = ?`,
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
        data: detailsProductQuery[0][0]
    });
}

export async function editProduct(req, res) {

    const editProductQuery = await db.query(
        `
        Update product
        Set shop_id = ?, location_id = ?, category_id = ?, name = ?, description = ?, price = ?, quantity = ?, image = ?, modified_at = ?
        Where id = ?
        `,
        [req.body.shop_id, req.body.location_id, req.body.category_id, req.body.name, req.body.description, req.body.price, req.body.quantity, req.body.image, new Date(), req.body.id],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    res.status(200).json({
        message: "Product edited successfully",
        data: req.body
    });
}

export function deleteProduct(req, res) {
    const deleteProductQuery = db.query(
        `
        Update product
        Set deleted_at = ?
        Where id = ?
        `,
        [new Date(), req.query.id],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    res.status(200).json({
        message: "Product deleted successfully",
        data: req.query
    });
}