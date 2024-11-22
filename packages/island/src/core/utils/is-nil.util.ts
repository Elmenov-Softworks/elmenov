import { Nil } from '../types';

export const isNil = (value: unknown): value is Nil => value == null;
