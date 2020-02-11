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
///////////////////////
controllerSecuencias.getSecuenciasAccionesId = function(id) {
  return new Promise(function(resolve, reject) {
    var sql = 'select a.* from secuencias a where a.idsecuencia = ?';
    connection.query(sql, [id], function(err, result) {
      if (err) {
        reject({ error: 'Error inesperado' });
      } else {
        /* console.log(result); */
        var secuencia = result[0];
        var sql = 'select a.* from acciones a where a.idsecuencia = ?';
        connection.query(sql, [id], function(err, result) {
          if (err) {
            reject({ error: 'Error inesperado' });
          } else {
            console.log('result', result);
            secuencia.acciones = result;
            console.log('secuencia', secuencia);
            resolve(secuencia);
          }
        });
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
    var sql = 'select * from secuencias s where s.nombre = ? AND s.idusuario=?';
    connection.query(sql, [data.nombre, data.idusuario], function(err, result) {
      if (err) {
        reject('Ya existe la accion o ha habido algun problema');
      } else {
        if (result.length > 0) {
          reject('El nombre de la secuencia ya existe');
        } else {
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
                  var idSecuencia = result[0].idsecuencia;
                  var idUsuario = result[0].idusuario;

                  var sql = 'insert into acciones(nombre,duracion,idusuario,idsecuencia,src) values';
                  var sqlData = [];
                  for (var x = 0; x < data.acciones.length; x++) {
                    if (x > 0) sql += ',';
                    sql += '(?, ?, ?, ?, ?)';
                    sqlData.push(data.acciones[x].nombre);
                    sqlData.push(data.acciones[x].duracion);
                    sqlData.push(idUsuario);
                    sqlData.push(idSecuencia);
                    sqlData.push(data.acciones[x].src);
                  }
                  connection.query(sql, sqlData, function(err, result) {
                    if (err) {
                      reject('Ya existe la accion o ha habido algun problema');
                    } else {
                      console.log('insertado accion');
                      resolve(result);
                    }
                  });
                }
              });
            }
          });
        }
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
