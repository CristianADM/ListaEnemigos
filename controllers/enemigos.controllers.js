const { Op } = require("sequelize");
const Enemigo = require("../models/enemigos.model");

const listarEnemigos = async (req, res) => {
    try {
        const {desde=0, limite=10, nivel_ira} = req.query;
        const query = {estado: true};
        if(nivel_ira){
            const enemigos = await Enemigo.findAndCountAll({
                where: query,
                offset: Number(desde),
                limit: Number(limite),
                order: [
                    ["nivel_ira", nivel_ira]
                ]
            });
            return res.json(enemigos);
        }
        const enemigos = await Enemigo.findAndCountAll({
            where: query,
            offset: Number(desde),
            limit: Number(limite)
        });
        return res.json(enemigos);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const buscar = async (req, res) => {
    try {
        const {termino} = req.params;
        const nivel_ira = Number(termino);
        if(nivel_ira){
            const enemigos = await Enemigo.findAndCountAll({
                where: {
                    nivel_ira
                }
            });
            return res.json(enemigos);
        }
        const enemigos = await Enemigo.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        nombre: {
                            [Op.substring]: termino
                        }
                    },
                    {
                        apellido: {
                            [Op.substring]: termino
                        }
                    }
                ]
            }
        });
        return res.json(enemigos);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const buscarEnemigoPorNombreOApellido = async (req, res) => {
    try {
        const {termino} = req.params;

        const enemigos = await Enemigo.findAndCountAll({
            where: {
                nombre,
                estado: true
            }
        });
        if(enemigos.length === 0){
            return res.json({
                msg: `No se han encontrado enemigos con ese nombre: ${nombre}`
            });
        }
        return res.json(enemigos);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const registrarEnemigo = async (req, res) => {
    try {
        const {nombre, apellido} = req.body;
        const existeEnemigo = await Enemigo.findOne({
            where: {
                nombre,
                apellido
            }
        });

        if(existeEnemigo){
            return res.json({
                msg: `El enemigo: ${nombre} ${apellido} ya esta registrado`
            });
        }

        const enemigo = new Enemigo(req.body);
        await enemigo.save();
        return res.json(enemigo);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const actualizarEnemigo = async (req, res) => {
    
    try {
        const {id} = req.params;
        const enemigo = await Enemigo.findByPk(id);

        if(!enemigo){
            return res.json({
                msg: `El enemigo con el id: ${id} no esta registrado`
            });
        }

        await enemigo.update(req.body);

        return res.json(enemigo);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const eliminarEnemigo = async (req, res) => {
    try {
        const {id} = req.params;
        const enemigo = await Enemigo.findByPk(id);

        if(!enemigo){
            return res.json({
                msg: `El enemigo con el id: ${id} no esta registrado`
            });
        }

        await enemigo.update({ estado: false});

        return res.json({
            msg: `El enemigo ha sido eliminado`,
            enemigo
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

module.exports = {
    registrarEnemigo,
    listarEnemigos,
    actualizarEnemigo,
    eliminarEnemigo,
    buscarEnemigoPorNombreOApellido,
    buscar
};