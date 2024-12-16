const { getAll, getById, createAttraction, updateAttraction, deleteAttraction } = require('../../controllers/attractions.controller');
const { checkAttractionId } = require('../../middlewares/attractions.middlewate');
const multer = require('multer');

const upload = multer({ dest: 'public/images/attractions' });

const router = require('express').Router();

router.get('/', getAll);
router.get('/:attractionId', checkAttractionId, getById);
router.post('/', upload.single('image'), createAttraction);
router.put('/:attractionId', upload.single('image'), checkAttractionId, updateAttraction);
router.delete('/:attractionId', checkAttractionId, deleteAttraction);


module.exports = router;