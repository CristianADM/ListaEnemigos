const express = require("express");
const cors = require("cors");

const db = require("../db/conexion");

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.appPaths = {
            enemigos: "/api/enemigos"
        };

        
        //Conectar a la base de datos
        this.conexionDB();

        //Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();
    }

    async conexionDB(){
        try {
            await db.authenticate();
            console.log("Base de datos en linea");
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares(){
        //Cors 
        this.app.use(cors());

        //Lectura y paseo del body
        this.app.use(express.json());
    };

    routes(){
        this.app.use(this.appPaths.enemigos, require("../routes/enemigos.routes"));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor arriba en puerto: ", this.port);
        });
    }
}

module.exports = Server