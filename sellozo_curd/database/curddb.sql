CREATE DATABASE sellozo_curd


CREATE TABLE [IF NOT EXISTS] Product(
	sku_id TEXT PRIMARY KEY,
	productName TEXT UNIQUE NOT NULL,
	price float4 NOT NULL,
	description TEXT NOT NULL,
	published BOOLEAN NOT NULL
);

CREATE TABLE [IF NOT EXISTS] Seller(
	seller_id TEXT PRIMARY KEY,
	sellerName TEXT NOT NULL,
	address TEXT NOT NULL,
	published BOOLEAN NOT NULL
);

INSERT INTO Product VALUES('XA-SAB6-3HK4','Jurassic World Savage Strike Dilophosaurus','Available on Sellozo', TRUE);
INSERT INTO Product Seller('S_1','FooBar Toys','000 E st', TRUE);