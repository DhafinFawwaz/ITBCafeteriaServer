import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { 
	createCartStatusTable, dropCartStatusTable,
	createLocationTable, dropLocationTable,
	createCategoryTable, dropCategoryTable,
	createPaymentStatusTable, dropPaymentStatusTable,
	createPaymentMethodTable, dropPaymentMethodTable,
} from './sql.js';

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
        console.log('regenerating all static database values...');

        await db.query(dropLocationTable);
		await db.query(createLocationTable)

		await db.query(
			"INSERT INTO location (name, description, created_at, modified_at, deleted_at) VALUES ?", 
			[[
				['GKUB', 'Kantin di GKUB', new Date(), new Date(), null],
				['GKUT', 'Kantin di GKUT', new Date(), new Date(), null],
				['Depan', 'Kantin di Depan ITB', new Date(), new Date(), null],
				['Borju', 'Kantin di Labtek V', new Date(), new Date(), null],
				['SBM', 'Kantin di SBM', new Date(), new Date(), null],
				['CRCS', 'Kantin di CRCS', new Date(), new Date(), null],
				['Saraga', 'Kantin di Saraga', new Date(), new Date(), null],
			]], 
			(err) => {
			if (err) throw err;
			conn.end();
		});
        console.log('***regenerated location***');

		await db.query(dropCategoryTable);
		await db.query(createCategoryTable);
		await db.query(
			"INSERT INTO category (name, description, created_at, modified_at, deleted_at) VALUES ?", 
			[[
				['Minuman', 'Untuk diminum', new Date(), new Date(), null],
				['Makanan', 'Untuk dimakan', new Date(), new Date(), null],
				['Snack', 'Untuk nyemil', new Date(), new Date(), null],
			]], 
			(err) => {
			if (err) throw err;
			conn.end();
		});
        console.log('***regenerated category***');

		await db.query(dropPaymentMethodTable);
		await db.query(createPaymentMethodTable);
		await db.query(
			"INSERT INTO payment_method (name, description, created_at, modified_at, deleted_at) VALUES ?", 
			[[
				['Cash', 'Langsung bayar di tempat', new Date(), new Date(), null],
				['Gopay', 'Menggunakan aplikasi Gojek', new Date(), new Date(), null],
			]], 
			(err) => {
			if (err) throw err;
			conn.end();
		});
        console.log('***regenerated payment_method***');

		await db.query(dropCartStatusTable);
		await db.query(createCartStatusTable);
		await db.query(
			"INSERT INTO cart_status (name, description, created_at, modified_at, deleted_at) VALUES ?", 
			[[
				['On Hold', 'Pesanan masih dalam keranjang.', new Date(), new Date(), null],
				['In Progress', 'Pesanan sedang dibuat, mohon ditunggu', new Date(), new Date(), null],
				['Finished', 'Pesanan telah selesai. Silahkan diambil', new Date(), new Date(), null],
				['History', 'Pesanan telah selesai. Silahkan diambil', new Date(), new Date(), null],
			]], 
			(err) => {
			if (err) throw err;
			conn.end();
		});
        console.log('***regenerated cart_status***');

		await db.query(dropPaymentStatusTable);
		await db.query(createPaymentStatusTable);
		await db.query(
			"INSERT INTO payment_status (name, description, created_at, modified_at, deleted_at) VALUES ?", 
			[[
				['Not paid', 'Pesanan belum dibayar.', new Date(), new Date(), null],
				['Paid', 'Pesanan telah dibayar', new Date(), new Date(), null],
			]], 
			(err) => {
			if (err) throw err;
			conn.end();
		});
        console.log('***regenerated payment_status***');
		
        console.log('');
        console.log('All static database values regenerated successfully...\n');
    
	}catch(err){
		console.error(err);
	}
}
await loadAndSaveData();
process.exit();
