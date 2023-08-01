import dotenv from "dotenv";
import mysql from 'mysql2/promise';

dotenv.config();
export const db = await mysql.createConnection(process.env.DATABASE_URL);
// export const db = await mysql.createConnection({
//     host: process.env.MYSQLHOST,
//     port: process.env.MYSQLPORT,
//     user: process.env.MYSQLUSER,
//     password: process.env.MYSQLPASSWORD,
//     database: process.env.MYSQLDATABASE
// });
console.log('Connected to PlanetScale!')