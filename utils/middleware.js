const { SECRET } = require("./config");
const {
  InternalAPIError,
  BlogNotFoundError,
  InvalidAPIRequest,
  NotAuthorizedError,
  InvalidUserDataError,
  UserNotFoundError,
  InvalidCredentialsError,
  AccountDisabledError,
} = require("./errors");
const jwt = require("jsonwebtoken");
const { User, Session } = require("../models/index");
const { ValidationError } = require("sequelize");

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
  if (error instanceof AccountDisabledError) {
    return res.status(400).json({
      error: "Sorry, this account is temporarily disabled.",
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
    if (user.disabled) throw new AccountDisabledError();
    console.log(user);
    if (!user) throw new UserNotFoundError();
    const session = await Session.findOne({
      where: {
        token: token,
      },
    });
    if (!session) {
      throw new NotAuthorizedError();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    console.error(e);
    if (e instanceof AccountDisabledError) {
      return res.status(400).json({
        error: "Sorry, this account is temporarily disabled.",
      });
    }
    return res.status(401).json({ error: "Invalid or missing token!" });
  }
};

module.exports = { errorHandler, userExtractor };
