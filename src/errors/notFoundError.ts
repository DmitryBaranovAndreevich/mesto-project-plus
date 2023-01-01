export class NotFoundError extends Error {
  statusCode;
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}