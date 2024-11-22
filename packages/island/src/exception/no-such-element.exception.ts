import { RuntimeException } from './runtime.exception';

/**
 * Thrown by various accessor methods to indicate that the element being
 * requested does not exist.
 */
export class NoSuchElementException extends RuntimeException {
  constructor(message = 'Element being requested does not exist') {
    super(message);
  }
}
