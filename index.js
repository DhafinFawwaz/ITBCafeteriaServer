import express from "express";
import auth from "./routes/auth.routes.js";
import profile from "./routes/profile.routes.js";
import shop from "./routes/shop.routes.js";
import product from "./routes/product.routes.js";
import order from "./routes/order.routes.js";
import cart from "./routes/cart.routes.js";
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
app.use("/", auth);
app.use("/product", product);
app.use("/profile", profile);
app.use("/shop/profile", shop);
app.use("/product", product);
app.use("/order", order);
app.use("/cart", cart);

app.use(errorHandler);
dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});
