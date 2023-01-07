class InCorrectDataError extends Error {
  statusCode;

  constructor() {
    super('Переданны некорректные данные');
    this.statusCode = 400;
  }
}

export default InCorrectDataError;
