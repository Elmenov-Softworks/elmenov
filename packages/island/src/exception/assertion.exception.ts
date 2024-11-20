import { Exception } from './exception';

/**
 * This class represents an assertion exception that extends the base `Exception`
 * class. It provides a constructor that sets the message to 'Assertion error'
 * by default.
 *
 * Thrown when an assertion made via `assert()` fails.
 *
 * @remarks This does not mean the native `assert()`, but self-written `assert()`
 * functions, which work on the principle – if everything is fine, then nothing
 * happens, but if the check fails, an exception should be thrown. The native
 * `assert()` method still throws `AssertionError`.
 */
export class AssertionException extends Exception {
  /**
   * @param message - The message of the exception.
   */
  constructor(message = 'Assertion error') {
    super(message);
  }
}
