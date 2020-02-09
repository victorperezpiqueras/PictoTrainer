var express = require('express');
var router = express.Router();

var controllerUsuarios = require('../controllers/usuarios');
var controllerSecuencias = require('../controllers/secuencias');
var controllerAcciones = require('../controllers/acciones');
var controllerActividades = require('../controllers/actividades');

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

//Acciones
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

router.post('/usuarios/acciones', function(req, res, next) {
  console.log('acciones');
  controllerUsuarios
    .accionesUsuario(req.body)
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

router.post('/usuarios/secuencias', function(req, res, next) {
  console.log('secuencias');
  //        if(usuario.nombre && usuario.password && usuario.email){} EN EL FRONT
  controllerUsuarios
    .secuenciaUsuario(req.body)
    .then(function(secuencias) {
      res.json(secuencias);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

//Actividades
router.get('/usuarios/:id/actividades', function(req, res, next) {
  console.log('getUsuariosActividades');
  controllerUsuarios
    .getUsuariosActividades(req.params.id)
    .then(function(actividades) {
      res.json(actividades);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

router.post('/usuarios/actividades', function(req, res, next) {
  console.log('actividades');
  controllerUsuarios
    .actividadesUsuario(req.body)
    .then(function(actividades) {
      res.json(actividades);
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
    .getSecuenciasId(req.params.id)
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
    .deleteAccionesId(req.params.id)
    .then(function(acciones) {
      res.json(acciones);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

/* CONTROLLER ACTIVIDADES */

router.get('/actividades', function(req, res, next) {
  console.log('getactividades');
  controllerActividades
    .getActividades()
    .then(function(actividades) {
      res.json(actividades);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});
router.get('/actividades/:id', function(req, res, next) {
  console.log('getActividadesid');
  controllerActividades
    .getActividadesId(req.params.id)
    .then(function(actividades) {
      res.json(actividades);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});
router.delete('/actividades/delete', function(req, res, next) {
  console.log('deleteactividades');
  controllerActividades
    .deleteActividades()
    .then(function(actividades) {
      res.json(actividades);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});
router.delete('/actividades/delete/:id', function(req, res, next) {
  console.log('deleteActividadesid');
  controllerActividades
    .deleteActividadesId(req.params.id)
    .then(function(actividades) {
      res.json(actividades);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

module.exports = router;
