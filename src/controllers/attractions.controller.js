const Attraction = require("../models/attractions.model");


const getAll = async (req, res, next) => {
    try {
        const attractions = await Attraction.findAll();
        res.json(attractions);
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    const { attractionId } = req.params;
    try {
        const attraction = await Attraction.findByPk(attractionId);
        res.json(attraction);
    } catch (error) {
        next(error);
    }
}

const createAttraction = async (req, res, next) => {
    try {
        const newAttraction = await Attraction.create(req.body);
        res.json(newAttraction);
    } catch (error) {
        next(error);
    }
}

const updateAttraction = async (req, res, next) => {
    const { attractionId } = req.params;
    try {
        const attraction = await Attraction.findByPk(attractionId);
        await attraction.update(req.body);
        res.json(attraction);
    } catch (error) {
        next(error);
    }
}

const deleteAttraction = async (req, res, next) => {
    const { attractionId } = req.params;
    try {
        const attraction = await Attraction.findByPk(attractionId);
        await attraction.destroy();
        res.json(attraction);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAll, getById, createAttraction, updateAttraction, deleteAttraction
}