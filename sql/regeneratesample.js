import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { 
    dropShopTable, dropProductTable,
    createShopTable, createProductTable
} from './sql.js';
import { getRandomInt } from "../util/random.util.js";

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
        console.log('regenerating sample datas...');

        console.log('regenerating product...');
        await db.query(dropProductTable);
        await db.query(createProductTable);

        const dateNow = new Date();

        let productValues = [];
        for(let i = 0; i < 100; i++){

            const shopId = getRandomInt(1, 20);
            const locationId = getRandomInt(1, 7);
            const categoryId = getRandomInt(1, 3);
            const price = getRandomInt(2, 25) * 1000;
            const quantity = getRandomInt(1, 20);

            const width = getRandomInt(200, 400);
            const height = getRandomInt(200, 400);

            const imageLink = `https://picsum.photos/${width}/${height}`;

            productValues.push([shopId, locationId, categoryId, 'product ' + i, 'product ' + i + ' description', price, quantity, imageLink, dateNow, dateNow]);
        }

        await db.query(
            `
            INSERT INTO product (shop_id, location_id, category_id, name, description, price, quantity, image, created_at, modified_at)
            VALUES ?
            `,
            [productValues]
        );

        console.log('regenerating shop...');
        await db.query(dropShopTable);
        await db.query(createShopTable);

        let shopValues = [];
        for(let i = 0; i < 25; i++){
            const locationId = getRandomInt(1, 7);
            
            const width = getRandomInt(200, 400);
            const height = getRandomInt(200, 400);

            const imageLink = `https://picsum.photos/${width}/${height}`;
            shopValues.push([locationId, 'shop' + i, 'password' + i, 'shop' + i + '@gmail.com', '081234567'+i, imageLink, 'shop ' + i + ' description', dateNow, dateNow]);
        }

        await db.query(
            `
            INSERT INTO shop (location_id, username, password, email, telephone, image, description, created_at, modified_at)
            VALUES ?
            `,
            [shopValues]
        );
		
        console.log('Sample data regenerated successfully...\n');
    
	}catch(err){
		console.error(err);
	}
}
await loadAndSaveData();
process.exit();
