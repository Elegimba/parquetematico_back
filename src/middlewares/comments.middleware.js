const Comment = require('../models/comments.model');

const checkCommentId = async (req, res, next) => {
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);

    if(isNaN(commentId)) return res.status(400).json({ message: 'El id debe ser un número' });

    if(!comment) return res.status(400).json({ message: 'No existe' });

    next();
}

module.exports = {
    checkCommentId
}