const { Product } = require("../models/mysql");

module.exports = {
  async insertProduct(req, res) {
    try {
      const product = await Product.create({
        ...req.body,
        user_id: req.session.user_id
      });

      return res.json(product);
    } catch (error) {
      return res.send(error);
    }
  },
  async productsList(req, res) {
    // console.log("Chegou")
    // console.log(req.session);
    try {
      const productsList = await Product.findAll({
        where: { user_id: req.params.user_id }
      });
      let select = [];
      // console.log(productsList);
      productsList.map(
        (product) => {
          select.push(product.dataValues);
        }
      )
      console.log(select);
      res.json(select);
      // return select;
    } catch (error) {
      // return error;
      res.json(error)
    }
  },
  async prodsList(req, res) {
    // console.log("Chegou")
    // console.log(req.session);
    try {
      const productsList = await Product.findAll({
        where: { user_id: req.body.user_id }
      });
      let select = [];
      // console.log(productsList);
      productsList.map(
        (product) => {
          select.push(product.dataValues);
        }
      )
      // console.log(select);
      // res.json(select);
      return select;
    } catch (error) {
      return error;
      // res.json(error)
    }
  },
  async getProduct(req, res) {
    try {
      const product = await Product.findOne({
        where: { user_id: req.body.user_id, id: req.body.product_id }
      });
      
      return product.dataValues;
    } catch (error) {
      return error;
    }
  },
  async updateProduct(req, res) {
    try {
      console.log(req.body)
      const updateUser = Product.update(req.body, {
        returning: true,
        where: { user_id: req.body.user_id, id: req.body.product_id }
      });
      const updatedUser = await updateUser.then(
        ([rowsUpdate, [updatedUser]]) => {
          return updatedUser;
        }
      );
      return updatedUser;
      // return res.json(updatedUser);
    } catch (error) {
      return error;
      // return res.send(error);
    }
  },
  async deleteProduct(req, res) {
    try {
      const product = await Product.destroy({
        where: { user_id: req.session.user_id, id: req.body.product_id }
      });
      return res.json(product);
    } catch (error) {
      return res.send(error);
    }
  },
  async getProductStock(req, res) {
    try {
      const product = await Product.findOne({
        where: { user_id: req.session.user_id, id: req.body.product_id }
      });
      return res.json(product.stock);
    } catch (error) {
      return res.send(error);
    }
  },
  async getSumProdStocks(req, res) {
    try {
      const prodStocksSum = await Product.sum("stock", {
        where: { user_id: req.session.user_id }
      });
      return res.json(prodStocksSum);
    } catch (error) {
      return res.send(error);
    }
  },
  async getProductTypes(req, res){
    try {
      const productsByType = await Product.findAll({
        where: { user_id: req.body.user_id},
        group: 'type',
        attributes: ["type"],
      });
      let select = [];
      productsByType.map(
        (item) => {
          select.push({type: item.type})
        }
      )
      // res.end();
      return select;
    } catch (error) {
      return error;
    }
  },
};
