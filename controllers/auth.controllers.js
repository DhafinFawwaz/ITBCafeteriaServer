import { db } from "../sql/db.js";
import bcrypt from "bcryptjs";
import { registerUserService, loginUserService } from "../services/user.services.js";
import { registerShopService, loginShopService } from "../services/shop.services.js";

export function registerUser(req, res, next) {

    console.log(`Registering ${req.body.username}`);

    registerUserService(req.body, (error, result) => {
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

    loginUserService(req.body, (error, result) => {
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

export function registerShop(req, res, next) {

    console.log(`Registering ${req.body.username}`);

    registerShopService(req.body, (error, result) => {
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

export function loginShop(req, res, next) {

    loginShopService(req.body, (error, result) => {
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

