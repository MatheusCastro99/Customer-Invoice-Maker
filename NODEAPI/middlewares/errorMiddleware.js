const errorMiddleware = (err, req, res, next) => {
  console.log("Error dumbass");
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "Development" ? err.stack : null,
  });
};

module.exports = errorMiddleware;
