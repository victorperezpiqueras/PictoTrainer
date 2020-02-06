var express = require('express');
var router = express.Router();

var controllerUsuarios = require('../controllers/usuarios');
var controllerSecuencias = require('../controllers/secuencias');

/* USUARIOS */
router.get('/usuarios', function (req, res, next) {
    console.log("getUsuarios");
    controllerUsuarios.getUsuarios()
        .then(function (usuarios) {
            res.json(usuarios);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});

router.get('/usuarios/:id/acciones', function (req, res, next) {
    console.log("getUsuariosAcciones");
    controllerUsuarios.getUsuariosAcciones(req.params.id)
        .then(function (acciones) {
            res.json(acciones);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});

router.get('/usuarios/:id/secuencias', function (req, res, next) {
    console.log("getUsuariosSecuencias");
    controllerUsuarios.getUsuariosSecuencias(req.params.id)
        .then(function (secuencias) {
            res.json(secuencias);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});

router.get('/usuarios/:id/registros', function (req, res, next) {
    console.log("getUsuariosRegistros");
    controllerUsuarios.getUsuariosRegistros(req.params.id)
        .then(function (registros) {
            res.json(registros);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});

router.post('/usuarios/registro', function (req, res, next) {
    console.log("registro");
    //        if(usuario.nombre && usuario.password && usuario.email){} EN EL FRONT
    controllerUsuarios.registroUsuario(req.body)
        .then(function (usuario) {
            res.json(usuario);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});

router.post('/usuarios/login', function (req, res, next) {
    console.log("login");
    console.log(req.body)
    controllerUsuarios.loginUsuario(req.body)
        .then(function (usuario) {
            res.json(usuario);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});

/* SECUENCIAS */
router.get('/secuencias', function (req, res, next) {
    console.log("getSecuencias");
    controllerSecuencias.getSecuencias()
        .then(function (secuencias) {
            res.json(secuencias);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});

router.get('/proyectos/:id/usuarios', function (req, res, next) {
    console.log("getProyectosUsuarios");
    controllerProyectos.getProyectosUsuarios(req.params.id)
        .then(function (usuarios) {
            res.json(usuarios);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});

router.get('/proyectos/usuarios/roles', function (req, res, next) {
    console.log("getProyectosUsuariosRoles");
    controllerProyectos.getProyectosUsuariosRoles()
        .then(function (usuariosRoles) {
            res.json(usuariosRoles);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});
/*  body: 
    nombre, 
    descripcion, 
    idusuario
 */
router.post('/proyectos', function (req, res, next) {
    console.log("crearProyecto");
    controllerProyectos.crearProyecto(req.body)
        .then(function (proyecto) {
            res.json(proyecto);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});

/* :id=idproyecto 
    body: 
    rol="desarrollador || productOwner || stakeholder"
    idusuario = idusuario a agregar
 */
router.post('/proyectos/:id/agregarUsuario', function (req, res, next) {
    console.log("proyectoAgregarUsuario");
    controllerProyectos.proyectoAgregarUsuario(req.params.id, req.body)
        .then(function (proyecto) {
            res.json(proyecto);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});









module.exports = router;