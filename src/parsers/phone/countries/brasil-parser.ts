import { AbstractBaseParser } from '../abstract-base-parser';

export class BrasilParser extends AbstractBaseParser {
  patch(phoneNumber: string): string {
    return phoneNumber.replace(/(55\d{2})9?(\d{8})/, '$1' + '9' + '$2');
  }
}
