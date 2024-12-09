const { getAll, getById, createSchedule, updateSchedule, deleteSchedule } = require('../../controllers/schedule.controller');
const { checkScheduleID } = require('../../middlewares/schedule.middleware');

const router = require('express').Router();

router.get('/', getAll);
router.get('/:scheduleId', checkScheduleID, getById);

router.post('/', createSchedule);

router.put('/:scheduleId', checkScheduleID, updateSchedule);

router.delete('/:scheduleId', checkScheduleID, deleteSchedule);

module.exports = router;