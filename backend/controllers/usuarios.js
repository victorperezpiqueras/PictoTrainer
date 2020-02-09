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
ControllerUsuarios.getUsuariosAcciones = function(id) {
  return new Promise(function(resolve, reject) {
    var sql =
      'select p.idproyecto, p.nombre, p.descripcion from proyectos p, usuarios u, roles r where u.idusuario = ? and u.idusuario = r.idusuario and p.idproyecto = r.idproyecto';
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
ControllerUsuarios.getUsuariosProyectosPermisos = function(id, idp) {
  return new Promise(function(resolve, reject) {
    var sql =
      'select r2.permiso from proyectos p, usuarios u, roles r, rolespermisos r2  where u.idusuario = ? and p.idproyecto = ? and u.idusuario = r.idusuario and p.idproyecto = r.idproyecto and r2.idrol =r.idrol';
    connection.query(sql, [id, idp], function(err, result) {
      if (err) {
        /*  connection.end(function(err) {
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
