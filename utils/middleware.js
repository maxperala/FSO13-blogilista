const {
  InternalAPIError,
  BlogNotFoundError,
  InvalidAPIRequest,
} = require("./errors");

const errorHandler = async (error, req, res, next) => {
  console.error(error);
  if (error instanceof InternalAPIError) {
    return res.status(500).json({
      error: "An unknown API error occurred",
    });
  }
  if (error instanceof BlogNotFoundError) {
    return res.status(404).json({
      error: "Blog not found",
    });
  }
  if (error instanceof InvalidAPIRequest) {
    return res.status(400).json({
      error: "Invalid request",
    });
  }
  req.status(500).json({
    error: "An unknown error occurred",
  });
};

module.exports = { errorHandler };
