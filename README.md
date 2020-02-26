![Alt Text](https://eventos.uclm.es/_files/_event/_31550/_header_img/_58879.png)

# PictoTrainer

Aplicación web destinada a facilitar las actividades de entrenamiento y rehabilitación de las personas con diversidad funcional, implementando un sistema de creación de tareas con pictogramas y un entorno de visualización con temporizadores. La aplicación permite ajustar varios parámetros del temporizador, así como buscar pictogramas en la base de datos de [Arasaac](https://beta.arasaac.org/developers/api).

# Estructura

La aplicación está basada en una arquitectura Rest Cliente-Servidor. Se compone de un Backend que provee de una API para comunicarse con el frontend de Angular y se comunica con una base de datos de MySQL. Los recursos más importantes utilizados para el desarrollo son los siguientes:

## Backend
- [Node - v10.16](https://nodejs.org/en/)
- [Express - v4.17](https://expressjs.com/)

## Frontend
- [Angular - v8.1](https://angular.io/) 
- [Highcharts - v8.0](https://www.highcharts.com/) 
- [ProgressBar.js - v1.1](https://kimmobrunfeldt.github.io/progressbar.js/)


# Ejecución en local

Se debe crear un fichero `.env` dentro de la carpeta backend con las siguientes variables:
- DB_HOST = urlhost
- DB_PORT= puertodb
- DB_USER = usuariodb
- DB_PASSWORD = contraseñadb
- DB_DATABASE = nombredb


En el directorio raíz: 
- Para arrancar el cliente ejecutar `ng serve` y abrir el navegador en la dirección `http://localhost:4200/`. 
- Para arrancar el servidor ejecutar `npm run dev`.

