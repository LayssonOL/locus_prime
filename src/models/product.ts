const Product = (sequelize: any, DataTypes: any) => {
    const Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
        size: DataTypes.FLOAT,
        stock: DataTypes.INTEGER,
        type: DataTypes.STRING,
    });

    return Product;
}

export default Product;