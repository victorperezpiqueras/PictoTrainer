var controllerSecuencias = {};
var connection = require('../db/connection');
var bcrypt = require('bcryptjs');
var mysql = require('mysql');

controllerSecuencias.getSecuencias = function() {
  return new Promise(function(resolve, reject) {
    var sql = 'select * from secuencias';
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

controllerSecuencias.getSecuenciasId = function(id) {
  return new Promise(function(resolve, reject) {
    var sql = 'select a.* from secuencias a where a.idsecuencia = ?';
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

//POST
controllerSecuencias.postSecuencias = function(data) {
  return new Promise(function(resolve, reject) {
    var sql = 'insert into secuencias(idsecuencia,nombre,idusuario) values(?,?,?)';
    connection.query(sql, [data.idsecuencia, data.nombre, data.idusuario], function(err, result) {
      if (err) {
        reject('Ya existe la accion o ha habido algun problema');
      } else {
        console.log('insertado secuencia');
        resolve(result);
      }
    });
  });
};

//Super post

controllerSecuencias.postSecuenciasAcciones = function(data) {
  return new Promise(function(resolve, reject) {
    var sql = 'insert into secuencias(nombre, idusuario) values(?,?)';
    connection.query(sql, [data.nombre, data.idusuario], function(err, result) {
      if (err) {
        reject('Ya existe una secuencia asi');
      } else {
        console.log('insertado secuencia');

        var sql = 'select * from secuencias s where s.nombre = ? AND s.idusuario=?';
        connection.query(sql, [data.nombre, data.idusuario], function(err, result) {
          if (err) {
            reject('Error al buscar la secuencia');
          } else {
            console.log('idsecuencia', result);
            var idSecuencia = result[0].idsecuencia;
            var idUsuario = result[0].idusuario;

            for (var accion in data.acciones) {
              var sql = 'insert into acciones(nombre,duracion,idusuario,idsecuencia,src) values(?, ?, ?, ?, ?)';
              connection.query(
                sql,
                [
                  data.acciones[accion].nombre,
                  data.acciones[accion].duracion,
                  idUsuario,
                  idSecuencia,
                  data.acciones[accion].src
                ],
                function(err, result) {
                  if (err) {
                    reject('Ya existe la accion o ha habido algun problema');
                  } else {
                    console.log('insertado accion');
                    resolve(result);
                  }
                }
              );
            }
          }
        });
      }
    });
  });
};

//Fin super post

controllerSecuencias.deleteSecuencias = function() {
  return new Promise(function(resolve, reject) {
    var sql = 'delete from secuencias';
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

controllerSecuencias.deleteSecuenciasId = function(id) {
  return new Promise(function(resolve, reject) {
    var sql = 'delete from secuencias a where a.idsecuencia = ?';
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

module.exports = controllerSecuencias;
