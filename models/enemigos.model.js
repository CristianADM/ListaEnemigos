const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Enemigo = db.define("Enemigo", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },

    nombre:{
        allowNull: false,
        type: DataTypes.STRING
    },

    apellido:{
        allowNull: false,
        type: DataTypes.STRING
    },

    nivel_ira:{
        allowNull: false,
        type: DataTypes.INTEGER
    },

    motivo: {
        allowNull: false,
        type: DataTypes.STRING
    },

    estado: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Enemigo;