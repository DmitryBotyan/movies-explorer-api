class CreateError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CreateUserError';
    this.statusCode = 409;
  }
}

module.exports = { CreateError };
