import { createUserTableSQL, dropUserTableSQL,
    createProductTableSQL, dropProductTableSQL,
} from './sql.js';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();
const db = await mysql.createConnection(process.env.DATABASE_URL);
// const db = await mysql.createConnection({
//     host: process.env.MYSQLHOST,
//     port: process.env.MYSQLPORT,
//     user: process.env.MYSQLUSER,
//     password: process.env.MYSQLPASSWORD,
//     database: process.env.MYSQLDATABASE
// });

async function loadAndSaveData() {
	try {
		//clear the existing records
        await db.query(dropProductTableSQL);
        console.log('***dropped product table***');
		await db.query(dropUserTableSQL);
		console.log('***dropped user table***');
		
		//create the tables
        await db.query(createProductTableSQL);
        console.log('***created product table***');
		await db.query(createUserTableSQL);        
		console.log('***created user table***');
    
	}catch(err){
		console.error(err);
	}
}
await loadAndSaveData();
process.exit();
