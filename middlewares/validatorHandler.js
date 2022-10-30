const boom = require('@hapi/boom');

function validatorHandler(schema, property) { // property = req.body(POST) - req.params(GET) - req.query
  return (req, res, next) => {
    const data = req[property]; // La informacion llega de manera dinamica de un POST GET PATCH
    const { error } = schema.validate(data, { abortEarly: false });  // Para que envie todos los errores en conjunto
    if (error) { next(boom.badRequest(error)); }
    next();
  }
}

module.exports = validatorHandler;