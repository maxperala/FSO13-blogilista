const { SECRET } = require("./config");
const {
  InternalAPIError,
  BlogNotFoundError,
  InvalidAPIRequest,
  NotAuthorizedError,
  InvalidUserDataError,
  UserNotFoundError,
  InvalidCredentialsError,
} = require("./errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");
const { ValidationErrorItem, ValidationError } = require("sequelize");

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
  if (error instanceof NotAuthorizedError) {
    return res.status(401).json({
      error: "Please provide a valid token!",
    });
  }
  if (error instanceof InvalidUserDataError) {
    return res.status(400).json({
      error: "Please provide a username and a name",
    });
  }
  if (error instanceof UserNotFoundError) {
    return res.status(404).json({
      error: "User not found",
    });
  }
  if (error instanceof InvalidCredentialsError) {
    return res.status(401).json({
      error: "Invalid username or password!",
    });
  }
  if (error instanceof ValidationError) {
    return res.status(400).json({
      error: error.errors.map((e) => e.message).join(", "),
    });
  }
  res.status(500).json({
    error: "An unknown error occurred",
  });
};

const userExtractor = async (req, res, next) => {
  try {
    const auth = req.get("authorization");
    if (!auth || !auth.startsWith("Bearer ")) {
      throw new NotAuthorizedError();
    }
    const token = auth.substring(7);
    const verified = jwt.verify(token, SECRET);
    const user = await User.findOne({
      where: {
        username: verified.username,
      },
    });
    if (!user) throw new UserNotFoundError();
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ error: "Invalid or missing token!" });
  }
};

module.exports = { errorHandler, userExtractor };
