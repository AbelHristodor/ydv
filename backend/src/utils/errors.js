// Generic Error Handler
class GenericAPIError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

class DatabaseError extends GenericAPIError {
  statusCode = 500;

  constructor() {
    super(this.statusCode, 'Database Error');
  }
}

class BadRequestError extends GenericAPIError {
  statusCode = 400;

  constructor() {
    super(this.statusCode, 'Bad Request Error');
  }
}

class APIError extends GenericAPIError {
  statusCode = 500;

  constructor() {
    super(this.statusCode, 'Bad Request Error');
  }
}

module.exports = {
  DatabaseError,
  BadRequestError,
  APIError
};
