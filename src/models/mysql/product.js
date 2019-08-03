module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    size: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    type: DataTypes.STRING,
    user_id: DataTypes.UUID,
  });
  return Product;
};
