const express = require('express');

const categoriesRouter = require('./categoriesRoutes');
const productsRouter = require('./productsRoutes');
const usersRouter = require('./usersRoutes');

function routerApi(app) {

  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', usersRouter);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;