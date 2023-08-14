import bcrypt from "bcryptjs";
import { generateAccessToken, authenticateToken } from "../middlewares/auth.middlewares.js";
import { db } from "../sql/db.js";

export async function loginShopService({email, password}, callback) {
    const shopQuery = await db.query(
        "SELECT * FROM shop WHERE email = ?",
        [email],
        (err, data) => {
            if (err) {
                return callback(err);
            }
        }
    );

    if (!shopQuery[0][0]) {
        return callback("Shop not found");
    }
    const shop = shopQuery[0][0];

    const validPassword = await bcrypt.compare(password, shop.password);
    if (!validPassword) {
        return callback("Password is not correct");
    }

    const token = generateAccessToken(shop.email);
    return callback(null, { ...shop, token });
    
}

export async function registerShopService(params, callback) {
    if(params.username === undefined) {
        return callback({ message: "Username is required"});
    }
    if(params.password === undefined) {
        return callback({ message: "Password is required"});
    }
    if(params.email === undefined) {
        return callback({ message: "Email is required"});
    }
    if(params.telephone === undefined) {
        return callback({ message: "Telephone is required"});
    }

    const shopQuery = await db.query(
        "SELECT * FROM shop WHERE email = ?",
        [params.email],
        (err, data) => {
            if (err) {
                return callback(err);
            }
        }
    );

    if (shopQuery[0][0]) {
        return callback({ message: "email is already taken"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(params.password, salt);

    const newUser = await db.query(
        "INSERT INTO shop (username, password, description, email, telephone, location_id, image, created_at, modified_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [params.username, hashedPassword, "", params.email, params.telephone, params.location_id, "", new Date(), new Date()],
        (err, data) => {
            console.log(data);
            if (err) {
                return callback(err);
            }
        }
    );

    return callback(null, {
        id: newUser[0].insertId,
        location_id: params.location_id,
        username: params.username,
        password: params.password,
        email: params.email,
        telephone: params.telephone,
    });

}