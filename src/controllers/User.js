const { User } = require("../models/mysql");

module.exports = {
  async insertUser(req, res) {
    try {
      const user = await User.create(req.body);

      return res.json(user);
    } catch (error) {
      return res.send(error);
    }
  },
  async usersList(req, res) {
    try {
      const usersList = await User.findAll();
      return res.json(usersList);
    } catch (error) {
      return res.send(error);
    }
  },
  async getUser(req, res) {
    try {
      const user = await User.findByPk(req.body.user_id);
      return user.dataValues;
    } catch (error) {
      return error;
    }
  },
  async updateUser(req, res) {
    try {
      const updateUser = User.update(req.body, {
        returning: true,
        where: { id: req.body.user_id }
      });
      const updatedUser = await updateUser.then(
        ([rowsUpdate, [updatedUser]]) => {
          return updatedUser;
        }
      );
      return updatedUser;
    } catch (error) {
      return error;
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.destroy({ where: { id: req.session.user_id } });
      return res.json(user);
    } catch (error) {
      return res.send(error);
    }
  },
  async auth(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
      try {
        const user = await User.findOne({
          where: {
            email: email,
            password: password
          }
        });
        if (user != null && user != {}) {
          req.session.loggedin = true;
          req.session.user = user;
          // res.redirect("/home");
          res.json(req.session);
          // res.edn();
        } else {
            const newBody = {...req.body, name: email.split('@')[0]};
            const newUser = await User.create(newBody);
            req.session.loggedin = true;
            req.session.user = newUser;
            // res.redirect('/home');
            res.json(req.session);
            // res.end();
        }
        // res.end();
    } catch (error) {
        return res.send(error);
      }
    } else {
      res.send('Please a valid Email and Password!');

      // res.redirect("/auth");
    }
  },
  home(req, res) {
    if (req.session.loggedin) {
      res.render('userHome',{id: req.session.user.id, name: req.session.user.name});
    } else {
      res.send("Please login to view this page!");
      res.redirect("/auth");
    }
    res.end();
  }
};
