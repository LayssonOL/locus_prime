'use strict';

import * as fs from 'fs';
import * as path from 'path';
import { Sequelize } from 'sequelize';
import config from '../../config/database.js';
import { IDB } from '../../src/interfaces/ISequelize';

const basename = path.basename(__filename);

// const env = process.env.NODE_ENV || 'development';
// const config = require('../../config/database.js')[env];
const db: IDB = { sequelize: null, Sequelize: null};
const sequelize = new Sequelize(config);
// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

fs
  .readdirSync(__dirname)
  .filter((file: any) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file: any) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
