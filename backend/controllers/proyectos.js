var ControllerProyectos = {};
var connection = require('../db/connection');

ControllerProyectos.getProyectos = function() {
  return new Promise(function(resolve, reject) {
    var sql = 'select * from proyectos';
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

ControllerProyectos.getProyectosUsuarios = function(id) {
  return new Promise(function(resolve, reject) {
    var sql =
      'select u.idusuario, u.nombre, u.email from usuarios u, proyectos p, roles r where p.idproyecto = ? and u.idusuario = r.idusuario and p.idproyecto =r.idproyecto';
    connection.query(sql, [id], function(err, result) {
      if (err) {
        /*  connection.end(function(err) {
          console.log('Error DB');
        }); */
        reject({ error: 'Error inesperado' });
      } else {
        console.log(result);
        /*  connection.end(function(err) {
          console.log('Close the database connection.');
        }); */
        resolve(result);
      }
    });
  });
};
ControllerProyectos.getProyectosUsuariosRoles = function() {
  return new Promise(function(resolve, reject) {
    var sql =
      'select u.idusuario, u.nombre, u.email, r.nombre as rol, p.idproyecto from usuarios u, proyectos p, roles r where u.idusuario = r.idusuario and p.idproyecto = r.idproyecto';
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

ControllerProyectos.crearProyecto = function(data) {
  return new Promise(function(resolve, reject) {
    var sql = 'insert into proyectos(nombre,descripcion) values(?, ?)';
    connection.query(sql, [data.nombre, data.descripcion], function(err, result) {
      if (err) {
        /* connection.end(function(err) {
          console.log('Error DB');
        }); */
        reject('Ya existe un proyecto con ese nombre');
        //throw err;
      } else {
        console.log('insertado proyecto');

        var sql = 'select idproyecto from proyectos where nombre = ?';
        connection.query(sql, [data.nombre], function(err, result) {
          if (err) {
            /* connection.end(function(err) {
              console.log('Error DB');
            }); */
            reject('Error al buscar el proyecto');
            //throw err;
          } else {
            console.log('idproyecto', result);
            var idProyecto = result[0].idproyecto;

            var sql = 'insert into roles(nombre,idusuario,idproyecto) values(?, ?, ?)';
            connection.query(sql, ['productOwner', data.idusuario, idProyecto], function(err, result) {
              if (err) {
                /* connection.end(function(err) {
                  console.log('Error DB');
                }); */
                reject('Error al insertar los roles');
                //throw err;
              } else {
                console.log('insertado rol');

                var sql =
                  'select r.idrol from roles r, proyectos p, usuarios u where u.idusuario = ? and u.idusuario = r.idusuario and p.idproyecto = r.idproyecto and p.nombre = ?';
                connection.query(sql, [data.idusuario, data.nombre], function(err, result) {
                  if (err) {
                    /* connection.end(function(err) {
                      console.log('Error DB');
                    }); */
                    reject('Error al buscar el rol');
                    //throw err;
                  } else {
                    console.log(result);
                    var idRol = result[0].idrol;
                    var sql =
                      'insert into rolespermisos(idrol,permiso) values(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?)';
                    connection.query(
                      sql,
                      [
                        idRol,
                        'ordenar',
                        idRol,
                        'editarPBI',
                        idRol,
                        'mantenerUsuarios',
                        idRol,
                        'archivarProyecto',
                        idRol,
                        'setDone',
                        idRol,
                        'proyecciones'
                      ],
                      function(err, result) {
                        if (err) {
                          /* connection.end(function(err) {
                            console.log('Error DB');
                          }); */
                          reject('Error al insertar los permisos');
                          //throw err;
                        } else {
                          console.log('insertado rolespermisos');
                          /*  connection.end(function(err) {
                            console.log('Close the database connection.');
                          }); */
                          resolve(result);
                        }
                      }
                    );
                  }
                });
              }
            });
          }
        });
      }
    });
  });
};

ControllerProyectos.proyectoAgregarUsuario = function(id, data) {
  return new Promise(function(resolve, reject) {
    var sql = 'insert into roles(nombre,idusuario,idproyecto) values(?, ?, ?)';
    connection.query(sql, [data.rol, data.idusuario, id], function(err, result) {
      if (err) {
        /* connection.end(function(err) {
          console.log('Error DB');
        }); */
        reject({ error: 'Error inesperado' });
      } else {
        var sql =
          'select r.idrol from roles r, proyectos p, usuarios u where u.idusuario = ? and u.idusuario = r.idusuario and p.idproyecto = r.idproyecto and p.idproyecto = ?';
        connection.query(sql, [data.idusuario, id], function(err, result) {
          if (err) {
            /* connection.end(function(err) {
              console.log('Error DB');
            }); */
            reject({ error: 'Error inesperado' });
          } else {
            console.log(result);
            var idRol = result[0].idrol;

            if (data.rol == 'desarrollador') {
              var sql = 'insert into rolespermisos(idrol,permiso) values(?, ?),(?, ?),(?, ?)';
              var list = [idRol, 'editarPBI', idRol, 'estimarTamaño', idRol, 'setDone'];
            } else if (data.rol == 'productOwner') {
              var sql = 'insert into rolespermisos(idrol,permiso) values(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?)';
              var list = [
                idRol,
                'ordenar',
                idRol,
                'editarPBI',
                idRol,
                'mantenerUsuarios',
                idRol,
                'archivarProyecto',
                idRol,
                'setDone',
                idRol,
                'proyecciones'
              ];
            } else {
              var sql = 'insert into rolespermisos(idrol,permiso) values(?, ?)';
              var list = [idRol, 'proyecciones'];
            }
            connection.query(sql, list, function(err, result) {
              if (err) {
                /* connection.end(function(err) {
                  console.log('Error DB');
                }); */
                reject({ error: 'Error inesperado' });
              } else {
                console.log('insertado rolespermisos');
                /* connection.end(function(err) {
                  console.log('Close the database connection.');
                }); */
                resolve(result);
              }
            });
          }
        });
      }
    });
  });
};

module.exports = ControllerProyectos;
