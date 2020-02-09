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
