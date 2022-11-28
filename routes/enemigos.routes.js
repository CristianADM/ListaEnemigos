const { Router } = require("express");

const { registrarEnemigo, listarEnemigos, actualizarEnemigo, eliminarEnemigo, buscar } = require("../controllers/enemigos.controllers");

const router = Router();

router.get("/", listarEnemigos);

router.get("/:termino", buscar);

router.post("/", registrarEnemigo);

router.put("/:id", actualizarEnemigo);

router.delete("/:id", eliminarEnemigo);

module.exports = router;