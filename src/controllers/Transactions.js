const UserController = require("../controllers/User");
const ProductController = require("../controllers/Product");
const SaleController = require("../controllers/Sale");

module.exports = {
  async salesTotalBill(req, res) {
    try {
      const userSales = await SaleController.salesBillExtract(req, res);
      console.log(userSales);
      const productTypes = await ProductController.getProductTypes(req, res);
      console.log(productTypes);
      const products = await ProductController.productsList(req, res);
      console.log(products);
      let result = [];

      productTypes.map(item => {
        result.push({
          type: item.type,
          products: [],
          totalBill: 0
        });
      });
      products.map(product => {
        result.map(item => {
          if (item.type == product.type) {
            item.products = [...item.products, product.id];
          }
        });
      });
      console.log(result);
      userSales.map(sale => {
        result.map(item => {
          item.products.map(id => {
            if (id == sale._id.product_id) {
              item.totalBill = item.totalBill + sale.totalBilled;
            }
          });
        });
      });

      return res.json(result);
    } catch (error) {
      return res.send(error);
    }
  },
  async sellAProduct(req, res) {
    try {
      const product = await ProductController.getProduct(req, res);
      // console.log(product);
      if (product.stock <= 0) {
        res.send("Product without stock!");
      }
      const restingStock = product.stock - req.body.sold_qnt;
      req.session.billedValue = req.body.sold_qnt * product.price;
      // console.log(req.session);
      const prodUpdtd = await ProductController.updateProduct(
        {
          body: {
            ...req.body,
            stock: restingStock
          }
        },
        res
      );
      // console.log("CHEGOU");
      const sale = await SaleController.insertSale(
        {
          body: {
            ...req.body,
            billed_value: Number(req.session.billedValue)
          }
        },
        res
      );
      const user = await UserController.getUser(req, res);
      // console.log(user);
      req.session.billedValue += user.balance;
      const userUpdtd = await UserController.updateUser(
        {body:{
          ...req.body,
            balance: req.session.billedValue
          }
        },
        res
      );
      res.end();
    } catch (error) {
      return res.send(error);
    }
  }
};
