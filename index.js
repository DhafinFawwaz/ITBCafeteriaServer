import express from "express";
import user from "./routes/auth.routes.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use("/auth", user);

dotenv.config();
app.listen(parseInt(process.env.PORT), () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});
