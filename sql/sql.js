
export const dropCartTable = 'DROP TABLE IF EXISTS cart';
export const dropCartStatusTable = 'DROP TABLE IF EXISTS cart_status';
export const dropLocationTable = 'DROP TABLE IF EXISTS location';
export const dropShopTable = 'DROP TABLE IF EXISTS shop';
export const dropCategoryTable = 'DROP TABLE IF EXISTS category';
export const dropPaymentStatusTable = 'DROP TABLE IF EXISTS payment_status';
export const dropUserTable = 'DROP TABLE IF EXISTS user';
export const dropPaymentMethodTable = 'DROP TABLE IF EXISTS payment_method';
export const dropOrderItemTable = 'DROP TABLE IF EXISTS order_item';
export const dropProductTable = 'DROP TABLE IF EXISTS product';

export const createCartTable = `CREATE TABLE cart(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    shop_id INT NOT NULL,
    payment_method_id TINYINT NOT NULL,
    payment_status_id TINYINT NOT NULL,
    cart_status_id TINYINT NOT NULL,
    pickup_at DATETIME NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    note VARCHAR(1023) NOT NULL,
    created_at DATETIME NOT NULL,
    modified_at DATETIME NOT NULL
)`;

export const createCartStatusTable = `CREATE TABLE cart_status(
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    modified_at DATETIME NOT NULL,
    deleted_at DATETIME NULL
)`;

export const createLocationTable = `CREATE TABLE location(
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    modified_at DATETIME NOT NULL,
    deleted_at DATETIME NULL
)`;

export const createShopTable = `CREATE TABLE shop(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    location_id TINYINT NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(255) NOT NULL,
    image VARCHAR(1023) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    modified_at DATETIME NOT NULL
)`;

export const createCategoryTable = `CREATE TABLE category(
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    modified_at DATETIME NOT NULL,
    deleted_at DATETIME NULL
)`;

export const createPaymentStatusTable = `CREATE TABLE payment_status(
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    modified_at DATETIME NOT NULL,
    deleted_at DATETIME NULL
)`;

export const createUserTable = `CREATE TABLE user(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(255) NOT NULL,
    image VARCHAR(1023) NOT NULL,
    created_at DATETIME NOT NULL,
    modified_at DATETIME NOT NULL
)`;

export const createPaymentMethodTable = `CREATE TABLE payment_method(
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    modified_at DATETIME NOT NULL,
    deleted_at DATETIME NULL
)`;

export const createOrderItemTable = `CREATE TABLE order_item(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    cart_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at DATETIME NOT NULL,
    modified_at DATETIME NOT NULL
)`;

export const createProductTable = `CREATE TABLE product(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    shop_id INT NOT NULL,
    location_id TINYINT NOT NULL,
    category_id TINYINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    image VARCHAR(1023) NOT NULL,
    created_at DATETIME NOT NULL,
    modified_at DATETIME NOT NULL,
    deleted_at DATETIME NULL
)`;
