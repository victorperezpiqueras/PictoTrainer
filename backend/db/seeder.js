//var connection = require('./connection');
var mysql = require('mysql');
require('dotenv').config();
var connection = mysql.createPool({
  host: 'db4free.net',
  port: 3306,
  user: 'albacity',
  password: 'albacity',
  database: 'albacity'
});
/* connection.connect(function (err) {
  if (err) throw err;
  console.log('Conectado a MYSQL'); */
connection.query(
  'CREATE TABLE usuarios (idusuario INT AUTO_INCREMENT PRIMARY KEY,nombre VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL);',
  function(err, result) {
    if (err) throw err;
    console.log('Tabla USUARIOS creada');
    connection.query(
      'CREATE TABLE secuencias (idsecuencia int AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(255) NOT NULL, idusuario INT NOT NULL, foreign key(idusuario) REFERENCES usuarios(idusuario) );',
      function(err, result) {
        if (err) throw err;
        console.log('Tabla SECUENCIAS creada');
        connection.query(
          'CREATE TABLE acciones(idaccion INT AUTO_INCREMENT PRIMARY KEY,nombre VARCHAR(255) NOT NULL, duracion INT,idusuario INT NOT NULL, idsecuencia INT, src LONGBLOB' +
            ', foreign key(idusuario) REFERENCES usuarios(idusuario), foreign key(idsecuencia) REFERENCES secuencias(idsecuencia) ON DELETE CASCADE );',
          function(err, result) {
            if (err) throw err;
            console.log('Tabla ACCIONES creada');
            connection.query(
              'CREATE TABLE registros (idregistro int AUTO_INCREMENT PRIMARY KEY, fecha DATETIME NOT NULL, duracionTotal INT,idusuario INT NOT NULL,idsecuencia INT NOT NULL,' +
                ' foreign key(idusuario) REFERENCES usuarios(idusuario),foreign key(idsecuencia) REFERENCES secuencias(idsecuencia));',
              function(err, result) {
                if (err) throw err;
                console.log('Tabla REGISTROS creada');
                //connection.end();
                //console.log('Desconectado de MYSQL');
              }
            );
          }
        );
      }
    );
  }
);
/* }); */

/* connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "drop TABLE usuarios;";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Tabla USUARIOS borrada");
        connection.end();
    });
}); */
