const errorMiddleware = (err, req, res, next) => {
  console.log(
    "Something went wrong, please try again. If the error persists, reaccess the code"
  );
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "Development" ? err.stack : null,
  });
};

module.exports = errorMiddleware;
