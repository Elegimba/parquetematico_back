const User = require("../models/users.model")

// Example controller
const getAll = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll
}