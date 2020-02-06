function Permisos() {
  /* this.permisos = [
        "ordenar",
        "editarPBI",
        "estimarTamaño",
        "mantenerUsuarios",
        "archivarProyecto",
        "setDone",
        "proyecciones"
    ]; */
  this.permisosDesarrollador = function() {
    return [
      /* "ordenar", */
      'editarPBI',
      'estimarTamaño',
      /*  "mantenerUsuarios",
             "archivarProyecto", */
      'setDone'
      /* "proyecciones" */
    ];
  };
  this.permisosProductOwner = function() {
    return [
      'ordenar',
      'editarPBI',
      /* "estimarTamaño", */
      'mantenerUsuarios',
      'archivarProyecto',
      'setDone',
      'proyecciones'
    ];
  };
  this.permisosStakeholder = function() {
    return [
      /* "ordenar", */
      /* "editarPBI", */
      /*  "estimarTamaño", */
      /*  "mantenerUsuarios",
             "archivarProyecto", */
      /* "setDone", */
      'proyecciones'
    ];
  };
}

module.exports.Permisos = Permisos;
