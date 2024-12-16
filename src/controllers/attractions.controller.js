const Attraction = require("../models/attractions.model");
const fs = require('fs');

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

const addExtension = (req) => {
    const extension = '.' + req.file.mimetype.split('/')[1];
    const newName = req.file.filename + extension;
    const newPath = req.file.path + extension;
    fs.renameSync(req.file.path, newPath);

    req.body.image = `attractions/${newName}`;
    return req.body.image;
}

const createAttraction = async (req, res, next) => {
    try {
        const extension = '.' + req.file.mimetype.split('/')[1];
        const newName = req.file.filename + extension;
        const newPath = req.file.path + extension;
        fs.renameSync(req.file.path, newPath);
        
        req.body.image = `attractions/${newName}`;
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
        const updateData = req.body;
        if(req.file) {
            updateData.image = addExtension(req);
        }
        await attraction.update(updateData);
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