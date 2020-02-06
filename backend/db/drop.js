var connection = require('./connection');

connection.connect(function(err) {
  if (err) throw err;
  console.log('Conectado a MYSQL');
  connection.query('drop table rolespermisos;drop table roles;drop table proyectos;drop table usuarios;', function(
    err,
    result
  ) {
    if (err) throw err;
    console.log('Todas las tablas BORRADAS');
  });
});
