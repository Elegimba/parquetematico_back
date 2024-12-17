const { getAll, getById, createComment, editComment, deleteComment, getCommentByUser, getCommentBySchedule } = require('../../controllers/comments.controller');
const { checkCommentId } = require('../../middlewares/comments.middleware');
const { checkUserID } = require('../../middlewares/users.middleware');

const router = require('express').Router();

router.get('/', getAll);
router.get('/:commentId', checkCommentId, getById);
router.get('/:userId/comments', checkUserID, getCommentByUser);
router.get('/schedule/:scheduleId/comment', getCommentBySchedule);
router.post('/', createComment);
router.put('/:commentId', checkCommentId, editComment);
router.delete('/:commentId', checkCommentId, deleteComment);


module.exports = router;