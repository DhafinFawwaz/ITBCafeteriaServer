
export const dropUserTableSQL = 'DROP TABLE IF EXISTS user';
export const dropProductTableSQL = 'DROP TABLE IF EXISTS product';

export const insertUserTableSQL = 'INSERT INTO user (username, password, email, image, created_at, modified_at) VALUES (?,?,?,?,?,?)';
export const insertProductTableSQL = 'INSERT INTO product (user_id, name, description, price) VALUES (?,?,?,?)';

export const createUserTableSQL = `CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    modified_at DATETIME NOT NULL,
    PRIMARY KEY (id)
)`;

export const createProductTableSQL = `CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10,2),
    PRIMARY KEY (id),
    KEY parent_id_idx (user_id)
)`;