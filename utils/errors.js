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

module.exports = { InternalAPIError, BlogNotFoundError, InvalidAPIRequest };
