const UserController = require("../controllers/User");
const ProductController = require("../controllers/Product");
const SaleController = require("../controllers/Sale");

module.exports = {
  async salesTotalBill(req, res) {
    try {
      const userSales = await SaleController.salesBillExtract(req, res);
      // const productTypes = await ProductController.
      return res.json(userSales);
    } catch (error) {
      return res.send(error);
    }
  },
  async sellAProduct(req, res) {
    console.log('Entrou')
    try {
      const product = await ProductController.getProduct(req, res);
    //   console.log(product);
      const restingStock = product.stock - req.body.qnt;
      const prodUpdtd = await ProductController.updateProduct(
        ({
          params: {
            user_id: req.params.user_id,
            product_id: req.body.product_id
          },
          body: {
            stock: restingStock
          }
        }),
        res
      );
      let amount = req.body.qnt * product.price;
      const sale = await SaleController.insertSale(
        ({
          params: {
            user_id: Number(req.params.user_id)
          },
          body: {
            product_id: Number(req.body.product_id),
            sold_qnt: Number(req.body.qnt),
            billed_value: Number(amount)
          }
        }),
        res
      );
      const user = await UserController.getUser(
        ({
          params: {
            id: req.params.user_id
          }
        }),
        res
      );
      amount += user.balance;
      const userUpdtd = await UserController.updateUser(
        (req = {
          params: {
            id: req.params.user_id
          },
          body: {
            balance: amount
          }
        }),
        res
      );
      return res.json(userUpdtd);
    } catch (error) {
      return res.send(error);
    }
  }
};
