const { getAll } = require('../../controllers/attractions.controller');

const router = require('express').Router();

router.get('/', getAll)


module.exports = router;