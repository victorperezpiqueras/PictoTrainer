var express = require('express');
var router = express.Router();
var request = require('request');
var controllerUsuarios = require('../controllers/usuarios');
var controllerSecuencias = require('../controllers/secuencias');
var controllerAcciones = require('../controllers/acciones');
var controllerImagenes = require('../controllers/imagenes');

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

router.get('/usuarios/:id/secuencias/acciones', function(req, res, next) {
  console.log('getUsuariosSecuenciasAcciones');
  controllerUsuarios
    .getUsuariosSecuenciasAcciones(req.params.id)
    .then(function(secuencias) {
      res.json(secuencias);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

//Registros
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

router.post('/usuarios/:id/registros', function(req, res, next) {
  console.log('postUsuariosRegistro');
  console.log(req.body);
  controllerUsuarios
    .postUsuariosRegistro(req.body)
    .then(function(registro) {
      res.json(registro);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

//Registrarse
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
    .getSecuenciasId(req.params.id)
    .then(function(secuencias) {
      res.json(secuencias);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

router.get('/secuencias/:id/acciones', function(req, res, next) {
  console.log('getsecuenciasAccionesid');
  controllerSecuencias
    .getSecuenciasAccionesId(req.params.id)
    .then(function(secuencias) {
      res.json(secuencias);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

router.post('/secuencias', function(req, res, next) {
  console.log('postSecuenciasacciones');
  controllerSecuencias
    .postSecuenciasAcciones(req.body)
    .then(function(secuencias) {
      res.json(secuencias);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

router.put('/secuencias', function(req, res, next) {
  console.log('putSecuenciasacciones');
  controllerSecuencias
    .putSecuenciasAcciones(req.body)
    .then(function(secuencias) {
      res.json(secuencias);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

router.delete('/secuencias', function(req, res, next) {
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
router.delete('/secuencias/:id', function(req, res, next) {
  console.log('deletesecuenciasid');
  controllerSecuencias
    .deleteSecuenciasId(req.params.id)
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
    .getAccionesId(req.params.id)
    .then(function(acciones) {
      res.json(acciones);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

router.post('/acciones', function(req, res, next) {
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

router.delete('/acciones', function(req, res, next) {
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
router.delete('/acciones/:id', function(req, res, next) {
  console.log('deleteAccionesid');
  controllerAcciones
    .deleteAccionesId(req.params.id)
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

//Controller imagenes
router.get('/imagenes', function(req, res, next) {
  console.log('getImagenes');
  controllerImagenes
    .getImagenes()
    .then(function(imagenes) {
      res.json(imagenes);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});
router.get('/imagenes/:nombre', function(req, res, next) {
  console.log('getImagenesid');
  controllerImagenes
    .getImagenesId(req.params.nombre)
    .then(function(imagenes) {
      res.json(imagenes);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

router.post('/imagenes', function(req, res, next) {
  console.log('postImagenes');
  controllerImagenes
    .postImagenes(req.body)
    .then(function(imagenes) {
      res.json(imagenes);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

router.delete('/imagenes', function(req, res, next) {
  console.log('deleteImagenes');
  controllerImagenes
    .deleteImagenes()
    .then(function(imagenes) {
      res.json(imagenes);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});
router.delete('/imagenes/:nombre', function(req, res, next) {
  console.log('deleteImagenesid');
  controllerImagenes
    .deleteImagenesId(req.params.nombre)
    .then(function(imagenes) {
      res.json(imagenes);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

module.exports = router;
