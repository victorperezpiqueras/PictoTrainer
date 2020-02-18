const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
//const http = require('http');

var app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.json({ limit: '50MB' }));
app.use(express.urlencoded({ limit: '50MB' }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/api/holamundo', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send({
    holamundo: 'hola mundo'
  });
});

var viewsRouter = require('./routes/views');
var apiRouter = require('./routes/api');

app.use('/api', apiRouter);
app.use('/views', viewsRouter);

app.listen(port, () => {
  console.log('Servidor iniciado en el puerto', port);
});
