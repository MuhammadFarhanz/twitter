/**
 * Custom error class to handle response errors .
 */
class ResponseError extends Error {
  /**
   * Creates a new ResponseError instance.
   *
   * @param {number} status - The HTTP status code of the response.
   * @param {string} message - The error message.
   * @param {string} field - The field form identifier to associate with the error with empty string as the default value.
   */
  constructor(status, message, field = "") {
    super(message);
    this.status = status;
    this.field = field; // Include the field property to identify the form field
  }
}

export { ResponseError };
