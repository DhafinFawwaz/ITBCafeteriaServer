import { db } from "../sql/db.js";
import { saveImageService } from "../services/image.services.js";
import { getRandomInt } from "../util/random.util.js";

export async function addProduct(req, res) {

    // Save the image in separate database
    req.query.id = req.body.shop_id;
    req.body.shop_id = parseInt(req.body.shop_id);
    req.body.location_id = parseInt(req.body.location_id);
    req.body.category_id = parseInt(req.body.category_id);
    req.body.price = parseFloat(req.body.price);
    req.body.quantity = parseInt(req.body.quantity);
    
    await saveImageService(req, async (error, result) => {
        if(error) {
            console.log(error);
            return next(error.message);
        }
        req.body.image = result.url;

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
            message: "success",
            data: req.body
        });
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

export async function suggestedProductByLocation(req, res) {

    const locationId = req.query.location_id;
    const categoryId = req.query.category_id;
    const shopLimit = 6;
    const productLimit = 3;
    
    
    const suggestedProductQuery = await db.query(
    // select only the shop id where location_id = locationId
    // get only 6 random shop
    // get 3 random product in every shop
    // the array of product will be nested in shop as products
        `
        SELECT
        s.id AS shop_id,
        s.location_id,
        s.username,
        s.email,
        s.telephone,
        s.image AS shop_image,
        s.description AS shop_description,
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'product_id', p.id,
                    'category_id', p.category_id,
                    'name', p.name,
                    'description', p.description,
                    'price', p.price,
                    'quantity', p.quantity,
                    'image', p.image
                )
            ) AS products
            FROM (SELECT * FROM product WHERE product.shop_id = s.id AND product.category_id = ? ORDER BY RAND() LIMIT ?) p
        ) AS product_array
    FROM (SELECT * FROM shop WHERE location_id = ? ORDER BY RAND() LIMIT ?) s
    HAVING product_array IS NOT NULL;
        `,
        [categoryId, productLimit, locationId, shopLimit],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );


    res.status(200).json({
        message: "success",
        data: suggestedProductQuery[0]
    });

}

export async function getOwnedproduct(req, res) {

    const ownedProductQuery = await db.query(
        `
        SELECT * FROM product WHERE shop_id = ?
        `,
        [req.query.shop_id],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }

    );
    

    res.status(200).json({
        message: "success",
        data: ownedProductQuery[0]
    });

}

export async function getCartOrder(req, res) {
    const cartOrderQuery = await db.query(
        `
        SELECT * FROM cart_order WHERE user_id = ?
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
        data: cartOrderQuery[0]
    });
    
}