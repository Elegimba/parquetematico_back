const { getAll, getById, createComment, editComment, deleteComment } = require('../../controllers/comments.controller');

const router = require('express').Router();

router.get('/', getAll);
router.get('/:commentId', getById);
router.post('/', createComment);
router.put('/:commentId', editComment);
router.delete('/:commentId', deleteComment);


module.exports = router;