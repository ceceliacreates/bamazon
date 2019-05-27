const db = require("../models");
const products = require("./products.json");

db.Product.bulkCreate(products);