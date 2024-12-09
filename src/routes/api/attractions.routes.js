const { getAll, getById, createAttraction, updateAttraction, deleteAttraction } = require('../../controllers/attractions.controller');
const { checkAttractionId } = require('../../middlewares/attractions.middlewate');

const router = require('express').Router();

router.get('/', getAll);
router.get('/:attractionId', checkAttractionId, getById);
router.post('/', createAttraction);
router.put('/:attractionId', checkAttractionId, updateAttraction);
router.delete('/:attractionId', checkAttractionId, deleteAttraction);


module.exports = router;