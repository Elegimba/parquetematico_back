const router = require('express').Router();

router.use('/users', require('./api/users.routes'));
router.use('/attractions', require('./api/attractions.routes'));
router.use('/comments', require('./api/comments.routes'));
router.use('/schedules', require('./api/schedules.routes'));


module.exports = router;