class InternalAPIError extends Error {
  constructor() {
    super("An unknown error occurred");
    this.name = "InternalAPIError";
  }
}

class BlogNotFoundError extends Error {
  constructor() {
    super("Blog not found");
    this.name = "BlogNotFoundError";
  }
}

class InvalidAPIRequest extends Error {
  constructor(message) {
    super(message || "Invalid API request");
    this.name = "InvalidAPIRequest";
  }
}

class NotAuthorizedError extends Error {
  constructor(message) {
    super("Please provide a valid token!");
    this.name = "NotAuthorizedError";
  }
}

class InvalidUserDataError extends Error {
  constructor(message) {
    super("Please provide a username and a name");
    this.name = "InvalidUserDataError";
  }
}

class UserNotFoundError extends Error {
  constructor() {
    super("User not found");
    this.name = "UserNotFoundError";
  }
}

class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid username or password!");
    this.name = "InvalidCredentialsError";
  }
}

module.exports = {
  InternalAPIError,
  BlogNotFoundError,
  InvalidAPIRequest,
  NotAuthorizedError,
  InvalidUserDataError,
  UserNotFoundError,
  InvalidCredentialsError,
};
