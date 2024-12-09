const Attraction = require('../models/attractions.model');

const checkAttractionId = async (req, res, next) => {
    const { attractionId } = req.params;
    const attraction = await Attraction.findByPk(attractionId);

    if(isNaN(attractionId)) return res.status(400).json({ message: 'El id debe ser un número' });

    if(!attraction) return res.status(400).json({ message: 'No existe' });

    next();
}

module.exports = {
    checkAttractionId
}