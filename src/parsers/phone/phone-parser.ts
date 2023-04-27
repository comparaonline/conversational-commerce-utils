import { IUserPhone } from '@interfaces/IUser';
import { countriesParsers } from './countries';
import parsePhoneNumber from 'libphonenumber-js';

/**
 * Format a phone number to whatsapp format from country
 * @param rawNumber receive a phone number sanitized
 */
export const phoneParser = (rawNumber: string): IUserPhone | undefined => {
  const phoneToParse = rawNumber.startsWith('+') ? rawNumber : `+${rawNumber}`;
  const parser = parsePhoneNumber(phoneToParse);

  if (!parser) return;
  const countryHelpers = countriesParsers[<string>parser.country];

  const phoneNumber = parser.number.replace(/[^0-9]/g, '');
  const phonePatch = countryHelpers?.patch ? countryHelpers.patch(phoneNumber) : phoneNumber;

  return {
    raw: rawNumber,
    country: parser.country as string,
    countryCallingCode: parser.countryCallingCode as string,
    nationalNumber: parser.nationalNumber as string,
    number: phonePatch,
    isValid: parser.isValid(),
  };
};
