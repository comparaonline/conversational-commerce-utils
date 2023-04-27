/* istanbul ignore file */

import { AbstractBaseParser } from '../abstract-base-parser';
import { BrasilParser } from './brasil-parser';

export const countriesParsers: { [countryAlpha2: string]: AbstractBaseParser } = {
  BR: new BrasilParser(),
};
