var express = require('express');
var router = express.Router();
var request = require('request');
var controllerUsuarios = require('../controllers/usuarios');
var controllerSecuencias = require('../controllers/secuencias');
var controllerAcciones = require('../controllers/acciones');

/* CONTROLLER USUARIOS */

router.get('/usuarios', function(req, res, next) {
  console.log('getUsuarios');
  controllerUsuarios
    .getUsuarios()
    .then(function(usuarios) {
      res.json(usuarios);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

//Acciones por usuarios
router.get('/usuarios/:id/acciones', function(req, res, next) {
  console.log('getUsuariosAcciones');
  controllerUsuarios
    .getUsuariosAcciones(req.params.id)
    .then(function(acciones) {
      res.json(acciones);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

//Secuencias
router.get('/usuarios/:id/secuencias', function(req, res, next) {
  console.log('getUsuariosSecuencias');
  controllerUsuarios
    .getUsuariosSecuencias(req.params.id)
    .then(function(secuencias) {
      res.json(secuencias);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

//Registro
router.get('/usuarios/:id/registros', function(req, res, next) {
  console.log('getUsuariosRegistros');
  controllerUsuarios
    .getUsuariosRegistros(req.params.id)
    .then(function(registros) {
      res.json(registros);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

router.post('/usuarios/registro', function(req, res, next) {
  console.log('registro');
  //        if(usuario.nombre && usuario.password && usuario.email){} EN EL FRONT
  controllerUsuarios
    .registroUsuario(req.body)
    .then(function(usuario) {
      res.json(usuario);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

//Login
router.post('/usuarios/login', function(req, res, next) {
  console.log('login');
  console.log(req.body);
  controllerUsuarios
    .loginUsuario(req.body)
    .then(function(usuario) {
      res.json(usuario);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

/* CONTROLLER SECUENCIAS */
router.get('/secuencias', function(req, res, next) {
  console.log('getsecuencias');
  controllerSecuencias
    .getSecuencias()
    .then(function(secuencias) {
      res.json(secuencias);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});
router.get('/secuencias/:id', function(req, res, next) {
  console.log('getsecuenciassid');
  controllerSecuencias
    .getSecuencias(req.params.id)
    .then(function(secuencias) {
      res.json(secuencias);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});
router.post('/postsecuencias/', function(req, res, next) {
  console.log('secuencias');
  controllerSecuencias
    .postSecuencias(req.body)
    .then(function(secuencias) {
      res.json(secuencias);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});
router.delete('/secuencias/delete', function(req, res, next) {
  console.log('deletesecuencias');
  controllerSecuencias
    .deleteSecuencias()
    .then(function(secuencias) {
      res.json(secuencias);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});
router.delete('/secuencias/delete/:id', function(req, res, next) {
  console.log('deletesecuenciasid');
  controllerSecuencias
    .deleteSecuencias(req.params.id)
    .then(function(secuencias) {
      res.json(secuencias);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

/* CONTROLLER ACCIONES */
router.get('/acciones', function(req, res, next) {
  console.log('getAcciones');
  controllerAcciones
    .getAcciones()
    .then(function(acciones) {
      res.json(acciones);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});
router.get('/acciones/:id', function(req, res, next) {
  console.log('getAccionesid');
  controllerAcciones
    .getAcciones(req.params.id)
    .then(function(acciones) {
      res.json(acciones);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

router.post('/postacciones', function(req, res, next) {
  console.log('acciones');
  controllerAcciones
    .postAcciones(req.body)
    .then(function(acciones) {
      res.json(acciones);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

router.delete('/acciones/delete', function(req, res, next) {
  console.log('deleteAcciones');
  controllerAcciones
    .deleteAcciones()
    .then(function(acciones) {
      res.json(acciones);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});
router.delete('/acciones/delete/:id', function(req, res, next) {
  console.log('deleteAccionesid');
  controllerAcciones
    .deleteAcciones(req.params.id)
    .then(function(acciones) {
      res.json(acciones);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

router.get('/picto/:nombre', function(req, res) {
  request('http://sesat.fdi.ucm.es:8080/servicios/rest/pictograma/palabra/' + req.params.nombre, function(
    error,
    response,
    body
  ) {
    console.log('error:', error); // Print the error if one occurred and handle it
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log(body);
    var cadena1 = body.slice(22, -16);
    console.log(cadena1);
    res.send({ nombre: req.params.nombre, src: cadena1 });
  });
});

module.exports = router;
