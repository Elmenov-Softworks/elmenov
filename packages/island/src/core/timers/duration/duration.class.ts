import { Nullable } from '../../types';

type DurationInput = {
  [key: string]: Nullable<number>;

  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

export class Duration {
  static readonly ZERO = new Duration(0);

  static readonly HOURS_PER_DAY = 24;

  static readonly MINUTES_PER_HOUR = 60;
  static readonly MINUTES_PER_DAY = Duration.MINUTES_PER_HOUR * Duration.HOURS_PER_DAY;

  static readonly SECONDS_PER_MINUTE = 60;
  static readonly SECONDS_PER_HOUR = Duration.SECONDS_PER_MINUTE * Duration.MINUTES_PER_HOUR;
  static readonly SECONDS_PER_DAY = Duration.SECONDS_PER_HOUR * Duration.HOURS_PER_DAY;

  static readonly MILISECONDS_PER_SECOND = 1000;
  static readonly MILISECONDS_PER_MINUTE = Duration.MILISECONDS_PER_SECOND * Duration.SECONDS_PER_MINUTE;
  static readonly MILISECONDS_PER_HOUR = Duration.MILISECONDS_PER_MINUTE * Duration.MINUTES_PER_HOUR;
  static readonly MILISECONDS_PER_DAY = Duration.MILISECONDS_PER_HOUR * Duration.HOURS_PER_DAY;

  #count: number;

  constructor(input: number);
  constructor(input: DurationInput);
  constructor(input: number | DurationInput) {
    if (typeof input === 'number') {
      this.#count = input;
    } else {
      this.#count = 0;

      for (const durationName in input) {
        const duration = input[durationName];

        if (duration) {
          if (durationName === 'days') {
            this.#count += duration * Duration.MILISECONDS_PER_DAY;
          } else if (durationName === 'hours') {
            this.#count += duration * Duration.MILISECONDS_PER_HOUR;
          } else if (durationName === 'minutes') {
            this.#count += duration * Duration.MILISECONDS_PER_MINUTE;
          } else if (durationName === 'seconds') {
            this.#count += duration * Duration.MILISECONDS_PER_SECOND;
          } else {
            this.#count += duration;
          }
        }
      }
    }
  }

  get inDays(): number {
    return this.#count / Duration.MILISECONDS_PER_DAY;
  }

  get inHours(): number {
    return this.#count / Duration.MILISECONDS_PER_HOUR;
  }

  get inMinutes(): number {
    return this.#count / Duration.MILISECONDS_PER_MINUTE;
  }

  get inSeconds(): number {
    return this.#count / Duration.MILISECONDS_PER_SECOND;
  }

  get inMiliseconds(): number {
    return this.#count;
  }

  valueOf(): number {
    return this.#count;
  }

  toString(): string {
    const hours = Math.floor(this.#count / Duration.MILISECONDS_PER_HOUR);
    const minutes = Math.floor((this.#count % Duration.MILISECONDS_PER_HOUR) / Duration.MILISECONDS_PER_MINUTE);
    const seconds = Math.floor((this.#count % Duration.MILISECONDS_PER_MINUTE) / Duration.MILISECONDS_PER_SECOND);
    const milliseconds = Math.floor(this.#count % Duration.MILISECONDS_PER_SECOND);

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
}
