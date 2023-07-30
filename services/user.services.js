import bcrypt from "bcryptjs";
import { generateAccessToken, authenticateToken } from "../middlewares/auth.middlewares.js";
import { insertUserTableSQL } from "../sql/sql.js";
import { db } from "../sql/db.js";

export async function login({email, password}, callback) {
    const userQuery = await db.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        (err, data) => {
            if (err) {
                return callback(err);
            }
        }
    );

    if (!userQuery[0][0]) {
        return callback("User not found");
    }
    const user = userQuery[0][0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return callback("Password is not correct");
    }

    const token = generateAccessToken(user.email);
    return callback(null, { ...user, token });
    
}

export async function register(params, callback) {
    if(params.username === undefined) {
        return callback({ message: "Username is required"});
    }
    if(params.password === undefined) {
        return callback({ message: "Password is required"});
    }
    if(params.email === undefined) {
        return callback({ message: "Email is required"});
    }

    const userQuery = await db.query(
        "SELECT * FROM user WHERE email = ?",
        [params.email],
        (err, data) => {
            if (err) {
                return callback(err);
            }
        }
    );

    if (userQuery[0][0]) {
        return callback({ message: "email is already taken"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(params.password, salt);

    const newUser = await db.query(
        "INSERT INTO user (username, password, email, image, created_at, modified_at) VALUES (?, ?, ?, ?, ?, ?)",
        [params.username, hashedPassword, params.email, "", new Date(), new Date()],
        (err, data) => {
            console.log(data);
            if (err) {
                return callback(err);
            }
        }
    );

    return callback(null, {
        id: newUser[0].insertId,
        username: params.username,
        password: params.password,
        email: params.email,
    });

}