import { Exception } from './exception';

/**
 * This class represents a runtime exception that extends the base `Exception` class.
 * It provides a constructor that sets the message to 'Runtime error' by default.
 *
 * Thrown when an unexpected situation occurs while the application is running.
 * For example, accessing a variable that has not been initialized.
 */
export class RuntimeException extends Exception {
  constructor(message = 'Runtime error') {
    super(message);
  }
}
