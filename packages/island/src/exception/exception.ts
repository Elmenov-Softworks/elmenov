/**
 * This class represents a base exception class that extends the built-in `Error`
 * class. It provides a constructor that sets the `message`, `name`, and `stack`
 * properties of the exception. If the `name` property is not set or is set to 'Error',
 * it sets the `name` property to the name of the constructor. If the `stack` property
 * is empty, it sets the `stack` property to the stack trace of the exception.
 *
 * Usage and differences from `Error` are roughly the same as in Java:
 * `Error` is thrown for native errors, `Exception` indicates that the error
 * is not of natural origin.
 */
export class Exception extends Error {
  constructor(message = '') {
    super(message);

    if (!this.name || this.name === 'Error') {
      Reflect.defineProperty(this, 'name', {
        configurable: true,
        enumerable: false,
        value: this.constructor.name,
        writable: true,
      });
    }

    Reflect.defineProperty(this, 'message', {
      configurable: true,
      enumerable: false,
      value: message,
      writable: true,
    });

    Reflect.defineProperty(this, 'stack', {
      configurable: true,
      enumerable: false,
      value: '',
      writable: true,
    });

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else if (this.stack === '') {
      this.stack = new Error(message).stack;
    }
  }
}
