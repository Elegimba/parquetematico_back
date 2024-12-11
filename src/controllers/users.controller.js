const User = require("../models/users.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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
    try {

        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.role = 'worker'

        const user = await User.create(req.body);

        res.json({ user, message: "Registrado con exito" })

    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const { name, surnames, email } = req.body;
    try {
        const user = await User.findByPk(userId);
        user.name = name;
        user.surnames = surnames;
        user.email = email;

        req.body.password = await bcrypt.hash(req.body.password, 10);

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

const login = async (req, res, next) => {

    try {
        const user = await User.findOne({
            where: { email: req.body.email }
        })

        if (!user)
            return res.status(401).json({
                message: 'Error en mail o contraseña'
            })

        const equal = await bcrypt.compare(req.body.password, user.password);

        if (!equal)
            return res.status(401).json({
                message: 'Error en mail o contraseña'
            })

        res.json({
            message: 'Login correcto',
            token: jwt.sign({
                user_id: user.id,
                user_role: user.role
            }, 'amusementpark')
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll, getById, createUser, updateUser, deleteUser, login
}