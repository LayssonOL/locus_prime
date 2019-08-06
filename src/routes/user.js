const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/User');

// Authentication
routes.post('/auth', UserController.auth);
routes.get('/home', UserController.home);

// User's Table
routes.get("/usersList", UserController.usersList);
routes.post("/insertUser", UserController.insertUser);
routes.get("/getUser", UserController.getUser);
routes.put("/updateUser", UserController.updateUser);
routes.delete("/deleteUser", UserController.deleteUser);