const express = require("express");
const routes = express.Router();
const UserController = require("../controllers/User");
const ProductController = require("../controllers/Product");
const SaleController = require("../controllers/Sale");
const TransactionsController = require("../controllers/Transactions");

// Authentication
routes.post("/auth", UserController.auth);
routes.get("/home", UserController.home);

// User's Table
routes.get("/usersList", UserController.usersList);
routes.post("/insertUser", UserController.insertUser);
routes.get("/getUser", UserController.getUser);
routes.put("/updateUser", UserController.updateUser);
routes.delete("/deleteUser", UserController.deleteUser);

// Product's Table
routes.get("/productsList/:user_id", ProductController.productsList);
routes.post("/insertProduct", ProductController.insertProduct);
routes.get("/getProduct", ProductController.getProduct);
routes.put("/updateProduct", ProductController.updateProduct);
routes.delete("/deleteProduct", ProductController.deleteProduct);
routes.get("/getProductStock", ProductController.getProductStock);
routes.get("/getSumProdStocks", ProductController.getSumProdStocks);
routes.post("/getProductsByType", ProductController.getProductTypes);

routes.all("/sellAProduct", TransactionsController.sellAProduct);
routes.all("/salesTotalBill", TransactionsController.salesTotalBill);

routes.get("/salesList", SaleController.salesList);
routes.post("/insertSale", SaleController.insertSale);
routes.post("/salesBillExtract", SaleController.salesBillExtract);
routes.get(
  "/salesQntExtractByProduct",
  SaleController.salesQntExtractByProduct
);

routes.all("*", (req, res) => res.status(404).send("Not Found"));

module.exports = routes;
