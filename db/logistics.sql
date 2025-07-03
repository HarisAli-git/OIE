create database oie;
use oie;

CREATE TABLE Customer (
	id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(50),
    docs_url VARCHAR(255)
);

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    name VARCHAR(100),
    email VARCHAR(100),
    FOREIGN KEY (customer_id) REFERENCES Customer(id)
);

CREATE TABLE Supplier (
    id INT PRIMARY KEY AUTO_INCREMENT,
    o_id INT,
    name VARCHAR(100),
    email VARCHAR(100),
    FOREIGN KEY (o_id) REFERENCES Origin(id)
);

CREATE TABLE Category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(9938)
);

CREATE TABLE Origin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE Product (
    pct_code INT PRIMARY KEY,
    category_id INT,
    description TEXT,
    cd_percentage DECIMAL(5,2),
    FOREIGN KEY (category_id) REFERENCES Category(id)
);

CREATE TABLE supplier_products (
    supplier_id INT,
    product_id INT,
    PRIMARY KEY (supplier_id, product_id),
    FOREIGN KEY (supplier_id) REFERENCES Supplier(id),
    FOREIGN KEY (product_id) REFERENCES Product(pct_code)
);

select * from Product;
select * from category;
drop table category;