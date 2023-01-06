export class InCorrectPassword extends Error {
  statusCode;
  constructor() {
    super("Неправильные данные для авторизации");
    this.statusCode = 401;
  }
}