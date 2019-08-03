"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/database')[env];
const basename = path.basename(__filename);

const sequelize = new Sequelize(config);
const db = { sequelize, Sequelize };

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//Models/tables
db.users = require('../mysql/user')(sequelize, Sequelize);
db.products = require('../mysql/product')(sequelize, Sequelize);

//Relations
db.products.belongsTo(db.users);
db.users.hasMany(db.products);

module.exports = db;
