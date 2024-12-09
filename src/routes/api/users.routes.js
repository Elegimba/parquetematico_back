const { getAll, getById, createUser, updateUser, deleteUser } = require('../../controllers/users.controller');
const { checkUserID } = require('../../middlewares/users.middleware');

const router = require('express').Router();

router.get('/', getAll)
router.get('/:userId', checkUserID, getById)

router.post('/', createUser)

router.put('/:userId', checkUserID, updateUser)

router.delete('/:userId', checkUserID, deleteUser)

module.exports = router;