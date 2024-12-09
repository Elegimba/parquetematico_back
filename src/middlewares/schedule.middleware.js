const Schedule = require('../models/schedules.model');

const checkScheduleID = async (req, res, next) => {
    const { scheduleId } = req.params;

    if (isNaN(scheduleId))
        return res.status(400).json({ message: 'El ID debe ser un numero' });

    const schedule = await Schedule.findByPk(scheduleId)


    if (!schedule)
        return res.status(404).json({ message: 'El horario no existe' });

    next();

}

module.exports = {
    checkScheduleID
}