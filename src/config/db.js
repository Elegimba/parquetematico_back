const { Sequelize } = require('sequelize');

//Leer fichero .env
require('dotenv').config();

//Conexión con la BD
const sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
}
);

// Prueba de conexión
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la BD establecidas');
    } catch (error) {
        console.log('Error de conexión a la BD');
    }
})();

module.exports = sequelize;