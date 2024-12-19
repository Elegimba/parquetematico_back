const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./users.model');
const Attraction = require('./attractions.model');
const Comment = require('./comments.model');

const Schedule = sequelize.define('Schedule', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: true
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize, tableName: 'schedule', timestamps: true
});

Schedule.belongsTo(User, { as: 'user', foreignKey: 'users_id' });
User.hasMany(Schedule, { as: 'schedules', foreignKey: 'users_id' });

Schedule.belongsTo(Attraction, { as: 'attraction', foreignKey: 'attractions_id' });
Attraction.hasMany(Schedule, { as: 'schedules', foreignKey: 'attractions_id' });

Schedule.hasOne(Comment, { as: 'comment', foreignKey: 'schedule_id' });

module.exports = Schedule;
