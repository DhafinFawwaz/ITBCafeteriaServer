import { db } from "../sql/db.js";
import { saveImageService } from "../services/image.services.js";

export async function addProduct(req, res) {

    // Save the image in separate database
    req.body.id = addProductQuery[0].insertId;
    saveImageService(req, (error, result) => {
        if(error) {
            console.log(error);
            return next(error.message);
        }

        req.body.image = result.url;
    });


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
}

export async function findProduct(req, res) {
    // cases: location_id, category_id, name

    const byLocation = req.query.location_id > 0 && req.query.location_id !== undefined && req.query.location_id !== null;
    const byCategory = req.query.category_id > 0 && req.query.category_id !== undefined && req.query.category_id !== null;
    const byName = req.query.name !== "" && req.query.name !== undefined && req.query.name !== null;
    const limit = 16;

    let findProductQuery;

    if(byLocation && byCategory && byName) {
        findProductQuery = await db.query(
            `SELECT * FROM product WHERE location_id = ? AND category_id = ? AND name LIKE ? LIMIT ?`,
            [req.query.location_id, req.query.category_id, `%${req.query.name}%`, limit],
            (error, result) => {
                if(error) {
                    console.log(error);
                    return next(error.message);
                }
            }
        );
    } else if(byLocation && byCategory) {
        findProductQuery = await db.query(
            `SELECT * FROM product WHERE location_id = ? AND category_id = ? LIMIT ?`,
            [req.query.location_id, req.query.category_id, limit],
            (error, result) => {
                if(error) {
                    console.log(error);
                    return next(error.message);
                }
            }
        );
    } else if(byLocation && byName) {
        findProductQuery = await db.query(
            `SELECT * FROM product WHERE location_id = ? AND name LIKE ? LIMIT ?`,
            [req.query.location_id, `%${req.query.name}%`, limit],
            (error, result) => {
                if(error) {
                    console.log(error);
                    return next(error.message);
                }
            }
        );
    } else if(byCategory && byName) {
        findProductQuery = await db.query(
            `SELECT * FROM product WHERE category_id = ? AND name LIKE ? LIMIT ?`,
            [req.query.category_id, `%${req.query.name}%`, limit],
            (error, result) => {
                if(error) {
                    console.log(error);
                    return next(error.message);
                }
            }
        );
    } else if(byLocation) {
        findProductQuery = await db.query(
            `SELECT * FROM product WHERE location_id = ? LIMIT ?`,
            [req.query.location_id, limit],
            (error, result) => {
                if(error) {
                    console.log(error);
                    return next(error.message);
                }
            }
        );
    }
    else if(byCategory) {
        findProductQuery = await db.query(
            `SELECT * FROM product WHERE category_id = ? LIMIT ?`,
            [req.query.category_id, limit],
            (error, result) => {
                if(error) {
                    console.log(error);
                    return next(error.message);
                }
            }
        );
    } else if(byName) {
        findProductQuery = await db.query(
            `SELECT * FROM product WHERE name LIKE ?`,
            [`%${req.query.name}%`],
            (error, result) => {
                if(error) {
                    console.log(error);
                    return next(error.message);
                }
            }
        );
    }

    res.status(200).json({
        message: "success",
        data: findProductQuery[0]
    });

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
        Set shop_id = ?, location_id = ?, category_id = ?, name = ?, description = ?, price = ?, quantity = ?, modified_at = ?
        Where id = ?
        `,
        [req.body.shop_id, req.body.location_id, req.body.category_id, req.body.name, req.body.description, req.body.price, req.body.quantity, new Date(), req.body.id],
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

export async function editImage(req, res, next) {
    saveImageService(req, (error, result) => {
        if(error) {
            console.log(error);
            return next(error.message);
        }

        // save image url to database
        const imageQuery = db.query(
            `
            UPDATE product
            SET image = ?
            WHERE id = ?;
            `,
            [result.url, req.query.id],
            (error, result) => {
                if(error) {
                    console.log(error);
                    return next(error.message);
                }
            }
        );

        return res.status(200).send({
            message: "success",
            data: {
                image: result.url
            },
        });
    });
}