const { getAll, getById, createUser, updateUser, deleteUser, login } = require('../../controllers/users.controller');
const { checkUserID } = require('../../middlewares/users.middleware');

const router = require('express').Router();



router.get('/', getAll)
router.get('/:userId', checkUserID, getById)

router.post('/register', createUser)
router.post('/login', login)

router.put('/:userId', checkUserID, updateUser)

router.delete('/:userId', checkUserID, deleteUser)



module.exports = router;