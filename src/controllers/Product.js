const { Product } = require("../models/mysql");

module.exports = {
  async insertProduct(req, res) {
    try {
      const product = await Product.create({
        ...req.body,
        user_id: req.params.user_id
      });

      return res.json(product);
    } catch (error) {
      return res.send(error);
    }
  },
  async productsList(req, res) {
    try {
      const usersList = await Product.findAll({
        where: { user_id: req.params.user_id }
      });
      return res.json(usersList);
    } catch (error) {
      return res.send(error);
    }
  },
  async getProduct(req, res) {
    try {
      const product = await Product.findOne({
        where: { user_id: req.params.user_id, id: req.params.product_id }
      });
      return res.json(product);
    } catch (error) {
      return res.send(error);
    }
  },
  async updateProduct(req, res) {
    try {
      const updateUser = Product.update(req.body, {
        returning: true,
        where: { user_id: req.params.user_id, id: req.params.product_id }
      });
      const updatedUser = await updateUser.then(
        ([rowsUpdate, [updatedUser]]) => {
          return res.json(updatedUser);
        }
      );
      return updatedUser;
    } catch (error) {
      return res.send(error);
    }
  },
  async deleteProduct(req, res) {
    try {
      const product = await Product.destroy({
        where: { user_id: req.params.user_id, id: req.params.product_id }
      });
      return res.json(product);
    } catch (error) {
      return res.send(error);
    }
  },
  async getProductStock(req, res) {
    try {
      const product = await Product.findOne({
        where: { user_id: req.params.user_id, id: req.body.product_id }
      });
      return res.json(product.stock);
    } catch (error) {
      return res.send(error);
    }
  },
  async getSumProdStocks(req, res) {
    try {
      const prodStocksSum = await Product.sum("stock", {
        where: { user_id: req.params.user_id }
      });
      return res.json(prodStocksSum);
    } catch (error) {
      return res.send(error);
    }
  },
  async getProductTypes(req, res){
    try {
      let select = [];
      const productsByType = await Product.findAll({
        where: { user_id: req.params.user_id},
        groupAll: 'type',
        attributes: ["type", "id"],
      });
      console.log(productsByType);
      return res.json(productsByType);
    } catch (error) {
      return res.send(error);
    }
  },
};
