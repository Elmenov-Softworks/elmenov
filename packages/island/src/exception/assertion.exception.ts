import { Exception } from './exception';

/**
 * This class represents an assertion exception that extends the base `Exception` class.
 * It provides a constructor that sets the message to 'Assertion error' by default.
 * 
 * Thrown when an assertion made via `assert()` fails.
*/
export class AssertionException extends Exception {
 constructor(message = 'Assertion error') {
   super(message);
 }
}
