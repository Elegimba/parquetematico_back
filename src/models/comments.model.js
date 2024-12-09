const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Schedule = require('./schedules.model');
const User = require('./users.model');

const Comment = sequelize.define('Comment', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    comments: {
        type: DataTypes.STRING(250),
        allowNull: true
    }

}, {
    sequelize, tableName: 'comments', timestamps: true
});

Comment.belongsTo(User, { as: 'user', foreignKey: 'users_id' });
User.hasMany(Schedule, { as: 'comments', foreignKey: 'users_id' });

Comment.belongsTo(Schedule, { as: 'schedule', foreignKey: 'schedule_id' });
Schedule.hasMany(Comment, { as: 'comments', foreignKey: 'schedule_id' });

module.exports = Comment;
