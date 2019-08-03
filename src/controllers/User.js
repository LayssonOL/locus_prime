const { User } = require('../models/mysql');

module.exports = {
    async insertUser(req, res){
        try {
            const user = await User.create(req.body);
    
            return res.json(user);
        } catch (error) {
            return res.send(error);
        }
    },
    async usersList(req, res){
        try {
            const usersList = await User.findAll();
            return res.json(usersList);
        } catch (error) {
            return res.send(error);
        }
    },
    async getUser(req, res){
        try {
            const user = await User.findByPk(req.params.id);
            return res.json(user);
        } catch (error) {
            return res.send(error);
        }
    },
    async updateUser(req, res){
        try {
            const updateUser = User.update(
                req.body,
                {returning: true, 
                    where: {id: req.params.id}});
            const updatedUser = await updateUser.then(
                ([ rowsUpdate, [updatedUser]]) => {
                    return res.json(updatedUser)
                } 
            );
            return updatedUser;
        } catch (error) {
            return res.send(error);
        }
    },
    async deleteUser(req, res){
        try {
            const user = await User.destroy(
                {where: {id: req.params.id}}
            );
            return res.json(user);
        } catch (error) {
            return res.send(error);
        }
    }
};