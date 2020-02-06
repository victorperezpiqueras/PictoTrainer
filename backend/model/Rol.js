var permisos = require('./Permisos');

function Rol(tipo) {
  this.permisos = new permisos.Permisos();
  this.usuarioPermisos = [];
  if (tipo == 'desarrollador') {
    this.usuarioPermisos = this.permisos.permisosDesarrollador();
  } else if (tipo == 'productOwner') {
    this.usuarioPermisos = this.permisos.permisosProductOwner();
  } else {
    // "stakeholder"
    this.usuarioPermisos = this.permisos.permisosStakeholder();
  }
}

module.exports.Rol = Rol;
