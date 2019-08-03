const Sale = require("../models/sale");

module.exports = {
    async insertSale(req, res){
        try {
            const {product_id, sold_qnt, billed_value} = req.body;
            const user_id = req.params.user_id;
            const body = {product_id, sold_qnt, billed_value, user_id};
            console.log(body);
            const sale = await Sale.create(body);
            return res.json(sale);
        } catch (error) {
            return res.send(error);
        }
    },
    async salesList(req, res) {
        try {
            const sales = await Sale.find({user_id: req.params.user_id});
            return res.json(sales);
        } catch (error) {
            return res.send(error);
        }
    },
    async totalBill(){
        try {
            const productsGrouped = await Sale.find().where('type');
        } catch (error) {
            
        }
    },
};

