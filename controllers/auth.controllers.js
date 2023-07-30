import { db } from "../sql/db.js";
import bcrypt from "bcryptjs";
import { register, login } from "../services/user.services.js";

export function registerUser(req, res, next) {

    console.log(`Registering ${req.body.username}`);

    register(req.body, (error, result) => {
        if(error) {
            console.log(error);
            return next(error.message);
        }
        return res.status(200).send({
            message: "success",
            data: result,
        });
    });

}

export function loginUser(req, res, next) {

    login(req.body, (error, result) => {
        if(error) {
            console.log(error);
            return res.status(404).json({ message: error });
            // return next(error.message);
        }
        return res.status(200).send({
            message: "success",
            data: result,
        });
    });
}

export async function profile(req, res, next) {
    const userQuery = await db.query(
        `SELECT * FROM user WHERE id = ?`,
        [req.query.id],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    console.log(userQuery[0][0]);

    return res.status(200).json({ 
        message: "Authorized User!",
        data: userQuery[0][0]
    });
}

export function logout(req, res) {
    return res.status(200).json({ 
        message: "Logged out successfully!",
    });
}