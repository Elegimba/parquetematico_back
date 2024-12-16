const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Attraction = sequelize.define('Attraction', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    min_height: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    average_duration: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    wait_time: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    functional: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(250),
        allowNull: true
    }

}, {
    sequelize, tableName: 'attractions', timestamps: true
});

module.exports = Attraction;
