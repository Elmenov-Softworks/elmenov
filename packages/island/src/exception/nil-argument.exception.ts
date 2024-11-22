import { Exception } from './exception';

/**
 * Exception for type `Nil`: thrown when a code section expects some data,
 * but instead of data the value `null` or `undefined` is stored/arrived.
 */
export class NilArgumentException extends Exception {
  public constructor(message = 'Passed null or undefined') {
    super(message);
  }
}
