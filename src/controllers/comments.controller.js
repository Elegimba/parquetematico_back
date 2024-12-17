const Attraction = require("../models/attractions.model");
const Comment = require("../models/comments.model");
const Schedule = require("../models/schedules.model");
const User = require("../models/users.model");


const getAll = async (req, res, next) => {
    try {
        const comments = await Comment.findAll({
            include: [
                {
                    model: Schedule,
                    as: 'schedule',
                    attributes: ["id", "start_time", "end_time"],

                    include: {
                        model: Attraction,
                        as: 'attraction',
                        attributes: ["id", "name"]
                    }

                },
                {
                    model: User,
                    as: 'user',
                    attributes: ["id", "name"]
                }
            ],
        });
        res.json(comments);
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    const { commentId } = req.params;
    try {
        const comment = await Comment.findByPk(commentId);
        res.json(comment);
    } catch (error) {
        next(error);
    }
}



const getCommentByUser = async (req, res, next) => {

    const { userId } = req.params;
    try {
        const comments = await Comment.findAll({
            where: { users_id: userId },
            include: [
                {
                    model: Schedule,
                    as: 'schedule',
                    attributes: ["id", "start_time", "end_time"],
                },
            ],
            attributes: {
                exclude: ['users_id', 'schedule_id']
            }
        });
        res.json(comments);
    } catch (error) {
        next(error);
    }

}

const getCommentBySchedule = async (req, res, next) => {
    const { scheduleId } = req.params
    try {
        const comment = await Comment.findOne({
            where: { schedule_id: scheduleId },
            include: [
                {
                    model: Schedule,
                    as: 'schedule',
                    attributes: ["id", "start_time", "end_time", "attractions_id"],

                    include: [{
                        model: Attraction,
                        as: 'attraction',
                        attributes: ["id", "name"]
                    }]
                }
            ]
        })
        res.json(comment)
    } catch (error) {
        next(error)
    }
}


const createComment = async (req, res, next) => {
    try {
        const newComment = await Comment.create(req.body);
        res.json(newComment);
    } catch (error) {
        next(error);
    }
}

const editComment = async (req, res, next) => {
    const { commentId } = req.params;
    try {
        const comment = await Comment.findByPk(commentId);
        await comment.update(req.body);
        res.json(comment);
    } catch (error) {
        next(error);
    }
}

const deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    try {
        const comment = await Comment.findByPk(commentId);
        await comment.destroy();
        res.json(comment);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAll, getById, createComment, editComment, deleteComment, getCommentByUser, getCommentBySchedule
}