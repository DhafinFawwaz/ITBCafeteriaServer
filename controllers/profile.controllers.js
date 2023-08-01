import { db } from "../sql/db.js";
import bcrypt from "bcryptjs";
import "../util/date.util.js";
import { saveImageService } from "../services/image.services.js";

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

export async function edit(req, res, next) {
    const userQuery = await db.query(
        `
        UPDATE user
        SET username = ?, telephone = ?, modified_at = ?
        WHERE id = ?;
        `,
        [req.body.username, req.body.telephone, new Date(), req.body.id],
        (error, result) => {
            if(error) {
                console.log(error);
                return next(error.message);
            }
        }
    );

    return res.status(200).json({ 
        message: "success",
        data: req.body
    });
}

export async function changePassword(req, res, next) {
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

export async function editImage(req, res, next) {
    saveImageService(req, (error, result) => {
        if(error) {
            console.log(error);
            return next(error.message);
        }

        // save image url to database
        const imageQuery = db.query(
            `
            UPDATE user
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