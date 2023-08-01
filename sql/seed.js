import { createCartTable, dropCartTable,
	createCartStatusTable, dropCartStatusTable,
	createLocationTable, dropLocationTable,
	createShopTable, dropShopTable,
	createCategoryTable, dropCategoryTable,
	createPaymentStatusTable, dropPaymentStatusTable,
	createUserTable, dropUserTable,
	createPaymentMethodTable, dropPaymentMethodTable,
	createOrderItemTable, dropOrderItemTable,
	createProductTable, dropProductTable
} from './sql.js';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();
// const db = await mysql.createConnection(process.env.DATABASE_URL);
const db = await mysql.createConnection({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
});

async function loadAndSaveData() {
	try {
		//clear the existing records
        console.log('dropping all tables...');
        await db.query(dropCartTable);
        console.log('***dropped cart table***');
		await db.query(dropCartStatusTable);
		console.log('***dropped cart status table***');
		await db.query(dropLocationTable);
		console.log('***dropped location table***');
		// await db.query(dropShopTable);
		console.log('***dropped shop table***');
		await db.query(dropCategoryTable);
		console.log('***dropped category table***');
		await db.query(dropPaymentStatusTable);
		console.log('***dropped payment status table***');
		// await db.query(dropUserTable);
		console.log('***dropped user table***');
		await db.query(dropPaymentMethodTable);
		console.log('***dropped payment table***');
		await db.query(dropOrderItemTable);
		console.log('***dropped order table***');
		await db.query(dropProductTable);
		console.log('***dropped product table***');
        console.log('\n');

		//create the tables
        console.log('creating all tables...');
        await db.query(createCartTable);
        console.log('***created cart table***');
		await db.query(createCartStatusTable);
		console.log('***created cart status table***');
		await db.query(createLocationTable);
		console.log('***created location table***');
		// await db.query(createShopTable);
		console.log('***created shop table***');
		await db.query(createCategoryTable);
		console.log('***created category table***');
		await db.query(createPaymentStatusTable);
		console.log('***created payment status table***');
		// await db.query(createUserTable);
		console.log('***created user table***');
		await db.query(createPaymentMethodTable);
		console.log('***created payment table***');
		await db.query(createOrderItemTable);
		console.log('***created order table***');
		await db.query(createProductTable);
		console.log('***created product table***');
    
	}catch(err){
		console.error(err);
	}
}
await loadAndSaveData();
process.exit();
