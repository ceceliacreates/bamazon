const db = require("../models");
const Sequelize = require("sequelize");
module.exports = function(app) {
        const Op = Sequelize.Op;
    //GET route for all products
    app.get("/api/products", function(req, res) {
        db.Product.findAll().then(function(results) {
            res.json(results);
        })
    });

    //GET route for a single product by NAME
    app.get("/api/products/:name", function(req,res) {
        db.Product.findOne({
            where: {
                product_name: req.params.name
            }
        }).then(function(result) {
            res.json(result);
        })
    });

    //GET route for products with inventory < 5
    app.get("/api/products/lowstock", function(req, res) {
        db.Product.findAll({
            where: {
                stock_quantity: {
                    [Op.lt]: 5
            }
        }
    }).then(function(results) {
        res.json(results);
    })
})
// PUT route for updating posts
app.put("/api/products", function(req, res) {
    db.Product.update(req.body,
      {
        where: {
          product_name: req.body.product_name
        }
      })
      .then(function(response) {
        res.json(response);
      });
  });
}