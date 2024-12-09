const Attraction = require("../models/attractions.model");

// Example controller
const getAll = async (req, res, next) => {
    try {
        const users = await Attraction.findAll();
        res.json(users)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll
}