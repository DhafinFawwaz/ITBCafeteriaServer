import express from "express";
import user from "./routes/auth.routes.js";
import product from "./routes/product.routes.js";
import { authenticateToken }from "./middlewares/auth.middlewares.js";
import { errorHandler } from "./middlewares/error.middlewares.js";
import dotenv from "dotenv";

import { expressjwt } from "express-jwt";

const app = express();

app.use(expressjwt({
    secret: process.env.ACCESS_TOKEN_SECRET,
    algorithms: ['HS256'],
}).unless({
    path: [
        '/login',
        '/register',
    ]
}));

app.use(express.json());
app.use("/", user);
app.use("/product", product);
app.use(errorHandler);
dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});
