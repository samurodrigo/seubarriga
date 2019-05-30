const app = require('express')();

const consign = require('consign');

const knex = require('knex');

// const knexlogger = require('knex-logger');

const knexFile = require('../knexfile');


// TODO criar chaveamento dinamico
app.db = knex(knexFile.test);

// knex log - Metodo 1 |biblioteca knex-logger
// app.use(knexlogger(app.db));

consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/routes.js')
  .into(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

// knex log - metodo 2 | usando os eventos
// app.db.on('query', (query) => {
//   console.log({ sql: query.sql, bindings: query.bindings ? query.bindings.join(',') : '' });
// })
//   .on('query-response', response => console.log(response))
//   .on('error', error => console.log(error));


module.exports = app;
