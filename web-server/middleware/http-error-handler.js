function httpErrorHandler(error, req, res, next) {
  console.log(error.message);
  const code = error.code || 500;

  res.status(code).send({ error });
}

module.exports = httpErrorHandler;
