var controllerImagenes = {};
var connection = require('../db/connection');
var bcrypt = require('bcryptjs');
var mysql = require('mysql');

controllerImagenes.getImagenes = function() {
  return new Promise(function(resolve, reject) {
    var sql = 'select * from imagenes';
    connection.query(sql, function(err, result) {
      if (err) {
        /* connection.end(function(err) {
          console.log('Error DB');
        }); */
        console.log(err);
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

controllerImagenes.getImagenesId = function(nombre) {
  return new Promise(function(resolve, reject) {
    var sql = 'select i.* from imagenes i where i.nombre = ?';
    connection.query(sql, [nombre], function(err, result) {
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

controllerImagenes.postImagenes = function(data) {
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

controllerImagenes.deleteImagenes = function() {
  return new Promise(function(resolve, reject) {
    var sql = 'delete from imagenes';
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

controllerImagenes.deleteImagenesId = function(nombre) {
  return new Promise(function(resolve, reject) {
    var sql = 'delete from imagenes a where i.nombre = ?';
    connection.query(sql, [nombre], function(err, result) {
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
module.exports = controllerImagenes;
