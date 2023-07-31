import { db } from "../sql/db.js";
import bcrypt from "bcryptjs";
import "../util/date.util.js";

export async function profile(req, res, next) {
    console.log("profile");
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

    if(userQuery[0][0] === undefined) {
        return res.status(400).json({ 
            message: "User not found"
        });
    }
    
    return res.status(200).json({ 
        message: "success",
        data: userQuery[0][0]
    });
}

export async function edit(req, res) {
    console.log("Editing profile");
    const userQuery = await db.query(
        `
        UPDATE user
        SET username = '${req.body.username}', telephone = '${req.body.telephone}', image = '${req.body.image}', modified_at = '${new Date().toSQLDateTime()}'
        WHERE id = ${req.body.id};
        `,
        [],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    console.log(userQuery);

    return res.status(200).json({ 
        message: "success",
        data: req.body
    });
}

export async function changePassword(req, res) {
    console.log("Changing password");

    // Get the old password
    const passwordCheckQuery = await db.query(
        `SELECT * FROM user WHERE id = ?`,
        [req.body.id],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    if(passwordCheckQuery[0][0] === undefined) {
        return res.status(400).json({
            message: "User not found"
        });
    }

    // Check if old password is correct
    console.log(req.body.oldpassword);
    const validPassword = await bcrypt.compare(req.body.oldpassword, passwordCheckQuery[0][0].password);
    if (!validPassword) {
        return res.json({
            message: "Password is not correct"
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newpassword, salt);

    const userQuery = await db.query(
        `
        UPDATE user
        SET password = '${hashedPassword}'
        WHERE id = ${req.body.id};
        `,
        [],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    console.log(userQuery);

    return res.status(200).json({
        message: "success",
        data: req.body
    });
}