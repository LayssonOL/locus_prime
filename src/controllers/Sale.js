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
    async salesBillExtract(req, res){
        try {
            // const userSales = await Sale.find(
            //             {'user_id': req.params.user_id},
            //             'product_id billed_value');
            const userSales = await Sale.aggregate(
                [
                    {
                        $match: {
                            user_id: Number(req.params.user_id)
                        }
                    },
                    {
                        $group: {
                            _id: {product_id: "$product_id"},
                            totalBilled: {$sum: "$billed_value"}
                        }
                    }
                ]
            );
            return res.json(userSales);
        } catch (error) {
            return res.send(error)
        }
    },
    async salesQntExtractByProduct(req, res){
        try {
            const soldTotalQnt = await Sale.aggregate([
                {
                    $match: {
                        user_id : Number(req.params.user_id)
                    }
                },
                {
                    $group: {
                        _id: {product_id: "$product_id"},
                        totalSold: {$sum: "$sold_qnt"}
                    }
                }
            ])
            return res.json(soldTotalQnt);
        } catch (error) {
            return res.send(error);
        }
    }
};

