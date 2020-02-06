var proyecto = require('./Proyecto');

function Usuario(nombre, email, password) {
  this.nombre = nombre;
  this.email = email;
  this.password = password;
  this.crearProyecto = function(nombre, descripcion) {
    var proyecto = new proyecto.Proyecto(nombre, descripcion);
    //db.insert(proyecto);
  };
}

module.exports.Usuario = Usuario;
