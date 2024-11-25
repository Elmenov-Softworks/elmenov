import { Nullable } from '../types';
import { Duration } from './duration/duration.class';

export class Timer {
  #isActive = false;
  #isInterval = false;
  #timerId: Nullable<ReturnType<typeof setTimeout>>;
  #duration: number;
  #action: VoidFunction;

  static run(callback: VoidFunction) {
    return new Timer(0, callback);
  }

  static interval(duration: number | Duration, callback: VoidFunction): Timer {
    const interval = new Timer(duration, callback);

    interval.#isInterval = true;

    return interval;
  }

  constructor(duration: number | Duration, callback: VoidFunction) {
    if (duration instanceof Duration) {
      this.#duration = duration.inMiliseconds;
    } else {
      this.#duration = duration;
    }

    this.#action = callback;
  }

  get isActive(): boolean {
    return this.#isActive;
  }

  get isInterval(): boolean {
    return this.#isInterval;
  }

  start(): void {
    if (this.#isInterval) {
      this.#startInterval();
    } else {
      this.#startTimer();
    }
  }

  cancel(): void {
    if (this.#isInterval) {
      this.#cancelInterval();
    } else {
      this.#cancelTimer();
    }

    this.#isActive = false;
  }

  #startTimer(): void {
    this.#timerId = setTimeout(() => {
      this.#action();

      this.#isActive = false;
    }, this.#duration);
  }

  #startInterval(): void {
    this.#timerId = setInterval(() => this.#action(), this.#duration);
  }

  #cancelTimer(): void {
    if (this.#timerId) {
      clearTimeout(this.#timerId);
    }
  }

  #cancelInterval(): void {
    if (this.#timerId) {
      clearInterval(this.#timerId);
    }
  }
}
