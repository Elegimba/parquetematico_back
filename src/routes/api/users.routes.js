const { getAll } = require('../../controllers/users.controller');

const router = require('express').Router();

router.get('/', getAll)

module.exports = router;