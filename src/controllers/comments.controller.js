const Comment = require("../models/comments.model");


const getAll = async (req, res, next) => {
    try {
        const comments = await Comment.findAll();
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
    getAll, getById, createComment, editComment, deleteComment
}