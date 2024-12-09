const Schedule = require("../models/schedules.model");

// Example controller
const getAll = async (req, res, next) => {
    try {
        const users = await Schedule.findAll();
        res.json(users)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    const { scheduleId } = req.params;
    try {
        const schedule = await Schedule.findByPk(scheduleId);
        res.json(schedule)
    } catch (error) {
        next(error)
    }
}

const createSchedule = async (req, res, next) => {
    try {
        const schedule = await Schedule.create(req.body);
        res.json(schedule)
    } catch (error) {
        next(error)
    }
}

const updateSchedule = async (req, res, next) => {
    const { scheduleId } = req.params;
    try {
        const schedule = await Schedule.findByPk(scheduleId);
        await schedule.update(req.body);
        res.json(schedule)
    } catch (error) {
        next(error)
    }
}

const deleteSchedule = async (req, res, next) => {
    const { scheduleId } = req.params;
    try {
        const schedule = await Schedule.findByPk(scheduleId);
        await schedule.destroy();
        res.json({ message: 'Schedule deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll, getById, createSchedule, updateSchedule, deleteSchedule
}