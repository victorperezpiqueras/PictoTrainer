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

/* IMAGENES */
ControllerUsuarios.postUpload = function(data) {
  return new Promise(function(resolve, reject) {
    var sql = 'insert into imagenes(nombre,src,idusuario) values(?,?,?)';
    connection.query(sql, [data.nombre, data.src, data.idusuario], function(err, result) {
      if (err) {
        console.log(err);
        reject('Ya existe la imagen o ha habido algun problema');
      } else {
        console.log('insertado imagen');
        resolve(result);
      }
    });
  });
};

ControllerUsuarios.getUsuariosImagenes = function(idusuario) {
  return new Promise(function(resolve, reject) {
    var sql = 'select * from imagenes where idusuario = ? ';
    connection.query(sql, [idusuario], function(err, result) {
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

ControllerUsuarios.getUsuariosSecuenciasAcciones = function(id) {
  //obtener las secuencias
  return new Promise(function(resolve, reject) {
    var sql = 'select a.* from secuencias a where a.idusuario = ?';
    connection.query(sql, [id], function(err, result) {
      if (err) {
        reject({ error: 'Error inesperado' });
      } else {
        resolve(result);
      }
    });
  }) //al resolver la promise con la consulta llamamos al then
    .then(secuencias => {
      //creamos la nueva promise que va a devolver las secuencias con acciones
      return new Promise(function(resolve, reject) {
        var promises = [];
        for (var sec of secuencias) {
          //guardamos una promise por cada lista de acciones que buscamos
          promises.push(
            new Promise(function(resolve, reject) {
              var sql = 'select * from acciones where idsecuencia = ?';
              connection.query(sql, [sec.idsecuencia], function(err, result) {
                if (err) {
                  reject({ error: 'Error inesperado' });
                } else {
                  resolve(result); //cada promise se resuelve al acabar
                }
              });
            })
          );
        } //cuando todas las promises esten resueltas se llama a la funcion
        Promise.all(promises).then(function(listasAcciones) {
          console.log(listasAcciones);
          console.log('FOR');
          //para cada lista de acciones de cada promise la metemos en la secuencia correspondiente
          for (var x = 0; x < secuencias.length; x++) {
            secuencias[x].acciones = listasAcciones[x];
            console.log(secuencias[x]);
          }
          //resolvemos la 2a promise con las secuencias
          resolve(secuencias);
        });
      });
    });
};

ControllerUsuarios.getUsuariosSecuenciasRegistros = function(id) {
  //obtener las secuencias
  return new Promise(function(resolve, reject) {
    var sql = 'select a.* from secuencias a where a.idusuario = ?';
    connection.query(sql, [id], function(err, result) {
      if (err) {
        reject({ error: 'Error inesperado' });
      } else {
        resolve(result);
      }
    });
  }) //al resolver la promise con la consulta llamamos al then
    .then(secuencias => {
      //creamos la nueva promise que va a devolver las secuencias con acciones
      return new Promise(function(resolve, reject) {
        var promises = [];
        for (var sec of secuencias) {
          //guardamos una promise por cada lista de acciones que buscamos
          promises.push(
            new Promise(function(resolve, reject) {
              var sql = 'select * from registros where idsecuencia = ?';
              connection.query(sql, [sec.idsecuencia], function(err, result) {
                if (err) {
                  reject({ error: 'Error inesperado' });
                } else {
                  resolve(result); //cada promise se resuelve al acabar
                }
              });
            })
          );
        } //cuando todas las promises esten resueltas se llama a la funcion
        Promise.all(promises).then(function(listasRegistros) {
          console.log(listasRegistros);
          console.log('FOR');
          //para cada lista de acciones de cada promise la metemos en la secuencia correspondiente
          for (var x = 0; x < secuencias.length; x++) {
            secuencias[x].registros = listasRegistros[x];
            console.log(secuencias[x]);
          }
          //resolvemos la 2a promise con las secuencias
          resolve(secuencias);
        });
      });
    });
};

ControllerUsuarios.getUsuariosRegistros = function(id) {
  return new Promise(function(resolve, reject) {
    var sql = 'select r.* from registros r, usuarios u where u.idusuario = ? and u.idusuario = r.idusuario;';
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

ControllerUsuarios.postUsuariosRegistro = function(data) {
  return new Promise(function(resolve, reject) {
    var sql = 'insert into registros(fecha,duracionTotal,idusuario,idsecuencia) values(?,?,?,?);';
    connection.query(sql, [new Date(data.fecha), data.duracionTotal, data.idusuario, data.idsecuencia], function(
      err,
      result
    ) {
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
        reject({ error: err });
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
