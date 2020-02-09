var ControllerUsuarios = {};
var connection = require('../db/connection');
var bcrypt = require('bcryptjs');
var mysql = require('mysql');

ControllerUsuarios.getUsuarios = function() {
  return new Promise(function(resolve, reject) {
    var sql = 'select * from usuarios';
    connection.query(sql, function(err, result) {
      if (err) {
        /* connection.end(function(err) {
          console.log('Error DB');
        }); */
        reject({ error: 'Error inesperado' });
      } else {
        console.log(result);
        /* connection.end(function(err) {
          console.log('Close the database connection.');
        }); */
        resolve(result);
      }
    });
  });
};

/*ACCIONES*/

//get acciones

ControllerUsuarios.getUsuariosAcciones = function(id) {
  return new Promise(function(resolve, reject) {
    var sql = 'select a.*, u.* from acciones a, usuarios u where u.idusuario = ? and u.idusuario = a.idusuario;';
    connection.query(sql, [id], function(err, result) {
      if (err) {
        /* connection.end(function(err) {
          console.log('Error DB');
        }); */
        reject({ error: 'Error inesperado' });
      } else {
        console.log(result);
        /* connection.end(function(err) {
          console.log('Close the database connection.');
        }); */
        resolve(result);
      }
    });
  });
};

//post acciones

ControllerUsuarios.accionesUsuario = function(data) {
  return new Promise(function(resolve, reject) {
    var sql =
      'insert into acciones(idaccion,nombre, duracion, idactividad, idusuario, idsecuencia) values(?,?,?,?,?,?)';
    connection.query(
      sql,
      [data.idaccion, data.nombre, data.duracion, data.idactividad, data.idusuario, data.idsecuencia],
      function(err, result) {
        if (err) {
          /* connection.end(function(err) {
          console.log('Error DB');
        }); */
          reject('Ya existe la accion o ha habido algun problema');
          //throw err;
        } else {
          console.log('insertado accion');
          resolve(result);
        }
      }
    );
  });
};

/*SECUENCIAS*/

//get secuencias
ControllerUsuarios.getUsuariosSecuencias = function(id) {
  return new Promise(function(resolve, reject) {
    var sql = 'select s.*, u.* from secuencias s, usuarios u where u.idusuario = ? and u.idusuario = s.idusuario;';
    connection.query(sql, [id], function(err, result) {
      if (err) {
        /* connection.end(function(err) {
          console.log('Error DB');
        }); */
        reject({ error: 'Error inesperado' });
      } else {
        console.log(result);
        /* connection.end(function(err) {
          console.log('Close the database connection.');
        }); */
        resolve(result);
      }
    });
  });
};

//post de secuenciaUsuario
ControllerUsuarios.secuenciaUsuario = function(data) {
  return new Promise(function(resolve, reject) {
    var sql = 'insert into secuencias(idsecuencia,nombre, idusuario) values(?,?,?)';
    connection.query(sql, [data.idsecuencia, data.nombre, data.idusuario], function(err, result) {
      if (err) {
        /* connection.end(function(err) {
          console.log('Error DB');
        }); */
        reject('Ya existe la accion o ha habido algun problema');
        //throw err;
      } else {
        console.log('insertado secuencia');
        resolve(result);
      }
    });
  });
};

/*ACTIVIDADES*/

//get secuencias
ControllerUsuarios.getUsuariosActividades = function(id) {
  return new Promise(function(resolve, reject) {
    var sql = 'select a.*, u.* from actividades a, usuarios u where u.idusuario = ? and u.idusuario = a.idusuario;';
    connection.query(sql, [id], function(err, result) {
      if (err) {
        /* connection.end(function(err) {
          console.log('Error DB');
        }); */
        reject({ error: 'Error inesperado' });
      } else {
        console.log(result);
        /* connection.end(function(err) {
          console.log('Close the database connection.');
        }); */
        resolve(result);
      }
    });
  });
};

//post de secuenciaUsuario
ControllerUsuarios.actividadesUsuario = function(data) {
  return new Promise(function(resolve, reject) {
    var sql = 'insert into actividades(idactividad,nombre,archivo,filename,idusuario) values(?,?,?,?,?)';
    connection.query(sql, [data.idactividad, data.nombre, data.archivo, data.filename, data.idusuario], function(
      err,
      result
    ) {
      if (err) {
        /* connection.end(function(err) {
          console.log('Error DB');
        }); */
        reject('Ya existe la accion o ha habido algun problema');
        //throw err;
      } else {
        console.log('insertado actividad');
        resolve(result);
      }
    });
  });
};

ControllerUsuarios.getUsuariosRegistros = function(id) {
  return new Promise(function(resolve, reject) {
    var sql = 'select r.*, u.* from registros r, usuarios u where u.idusuario = ? and u.idusuario = r.idusuario;';
    connection.query(sql, [id], function(err, result) {
      if (err) {
        /* connection.end(function(err) {
          console.log('Error DB');
        }); */
        reject({ error: 'Error inesperado' });
      } else {
        console.log(result);
        /* connection.end(function(err) {
          console.log('Close the database connection.');
        }); */
        resolve(result);
      }
    });
  });
};

ControllerUsuarios.registroUsuario = function(usuario) {
  return new Promise(function(resolve, reject) {
    var sql = 'select * from usuarios where nombre = ?';
    connection.query(sql, [usuario.nombre], function(err, result) {
      if (err) {
        /* connection.end(function(err) {
          console.log('Error DB');
        }); */
        reject({ error: 'Error' });
      } else {
        console.log(result);
        if (result.length <= 0) {
          var sql = 'insert into usuarios(nombre,password) values ?';
          var values = [[usuario.nombre, bcrypt.hashSync(usuario.password)]];
          connection.query(sql, [values], function(err, result) {
            if (err) throw err;
            console.log(result);
            /* connection.end(function(err) {
              console.log('Error DB');
            }); */
            resolve(result);
          });
        } else {
          /*  connection.end(function(err) {
            console.log('Close the database connection.');
          }); */
          reject({ error: 'Usuario ya existente' });
        }
      }
    });
  });
};
ControllerUsuarios.loginUsuario = function(usuario) {
  return new Promise(function(resolve, reject) {
    var sql = 'select * from usuarios where nombre = ? ';
    connection.query(sql, [usuario.nombre], function(err, result) {
      console.log(result);
      if (err) {
        /* connection.end(function(err) {
          console.log('Error DB');
        }); */
        reject({ error: 'Error inesperado' });
      } else {
        if (result.length <= 0) {
          /* connection.end(function(err) {
            console.log('Close the database connection.');
          }); */
          reject({ error: 'El usuario no existe' });
        } else if (!bcrypt.compareSync(usuario.password, result[0].password)) {
          /* connection.end(function(err) {
            console.log('Close the database connection.');
          }); */
          reject({ error: 'Las contraseñas no coinciden' });
        } else {
          /*  connection.end(function(err) {
            console.log('Close the database connection.');
          }); */
          resolve(result);
        }
      }
    });
  });
};

module.exports = ControllerUsuarios;
