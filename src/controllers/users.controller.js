const User = require("../models/users.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Schedule = require("../models/schedules.model");
const Attraction = require("../models/attractions.model");
const e = require("express");


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

const getAttracSchedule = async (req, res, next) => {
    const { userId } = req.params;

    try {

        const horarios = await Schedule.findAll({
            where: { users_id: userId },
            include: [
                {
                    model: Attraction,
                    as: 'attraction',
                    attributes: ["id", "name"],
                },
            ],
            order: [['start_time', 'ASC']],
            attributes: {
                exclude: ['users_id', 'attractions_id']
            }
        });
        return res.json(horarios);
        /* const resultado = horarios.map((horario) => ({

            atraccion: {
                name: horario.attraction.name,
                id: horario.attraction.id
            },
            horas_asignadas: {
                id: horario.id,
                start_time: horario.start_time,
                end_time: horario.end_time
            }
        })); */

        res.json(resultado);
    } catch (error) {

        res.status(500).json({ error: "No se pudieron obtener los datos." });
    }
};

module.exports = {
    getAll, getById, createUser, updateUser, deleteUser, login, getAttracSchedule
}