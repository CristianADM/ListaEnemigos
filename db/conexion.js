const { Sequelize } = require("sequelize");

const db = new Sequelize("enemigos", "root", "sasa", {
    host: "localhost",
    dialect: "mysql",
    define: {
        freezeTableName: true
    }
});

module.exports = db;