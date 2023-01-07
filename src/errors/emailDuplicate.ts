class EmailDuplicate extends Error {
  statusCode;

  constructor() {
    super('Такой адрес электронной почты уже используется');
    this.statusCode = 409;
  }
}

export default EmailDuplicate;
