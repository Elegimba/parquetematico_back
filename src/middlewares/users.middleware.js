const User = require('../models/users.model');

const checkUserID = async (req, res, next) => {
    const { userId } = req.params;

    if (isNaN(userId))
        return res.status(400).json({ message: 'El ID debe ser un numero' });

    const user = await User.findByPk(userId)


    if (!user)
        return res.status(404).json({ message: 'El usuario no existe' });

    next();

}

module.exports = {
    checkUserID
}