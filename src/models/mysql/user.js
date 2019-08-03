module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    balance: {type: DataTypes.FLOAT, defaultValue: 0.0}
  });
  return User;
};
