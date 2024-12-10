const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    surnames: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    password: {
        type: DataTypes.STRING(250),
        allowNull: true
    },
    role: {
        type: DataTypes.STRING(45),
        allowNull: true
    }
}, {
    sequelize, tableName: 'users', timestamps: true
});


module.exports = User;
