const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/User');
const ProductController = require('../controllers/Product');
const SaleController = require('../controllers/Sale');

// User's Table
routes.get("/usersList", UserController.usersList);
routes.post("/insertUser", UserController.insertUser);
routes.get("/getUser/:id", UserController.getUser);
routes.put("/updateUser/:id", UserController.updateUser);
routes.delete("/deleteUser/:id", UserController.deleteUser);

// Product's Table
routes.get("/productsList/:user_id", ProductController.productsList);
routes.post("/insertProduct/:user_id", ProductController.insertProduct);
routes.get('/getProduct/:user_id.:product_id', ProductController.getProduct);
routes.put('/updateProduct/:user_id.:product_id', ProductController.updateProduct);
routes.delete('/deleteProduct/:user_id.:product_id', ProductController.deleteProduct);
routes.get('/getProductStock/:user_id.:product_id', ProductController.getProductStock);
routes.get('/getSumProdStocks/:user_id', ProductController.getSumProdStocks);
// routes.get('/sellProduct/:user_id/product=:product_id/:howMany', UserController.updateUser ,ProductController.getSumProdStocks);

routes.get('/salesList/:user_id', SaleController.salesList);
routes.post('/insertSale/:user_id', SaleController.insertSale);

routes.all('*', (req, res) => res.notFound());

module.exports = routes;