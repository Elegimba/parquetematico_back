const User = require("../models/users.model")


const getAll = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findByPk(userId);
        res.json(user)
    } catch (error) {
        next(error)
    }
}

const createUser = async (req, res, next) => {
    const { name, surnames, email, password } = req.body;
    try {
        const user = await User.create({
            name, surnames, email, password
        });
        res.json(user)
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const { name, surnames, email, password } = req.body;
    try {
        const user = await User.findByPk(userId);
        user.name = name;
        user.surnames = surnames;
        user.email = email;
        user.password = password;
        await user.update(req.body);
        res.json(user)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findByPk(userId);
        await user.destroy();
        res.json({ message: "User deleted" })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll, getById, createUser, updateUser, deleteUser
}