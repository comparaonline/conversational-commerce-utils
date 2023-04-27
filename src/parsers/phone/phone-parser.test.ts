import { mockPatch, mockParser } from './abtract-base-parser.mock';
jest.mock('./countries', () => ({ countriesParsers: { BR: mockParser } }));

import { phoneParser } from './phone-parser';

describe('phoneParser', () => {
  it('should parse a phone number', () => {
    // arrange
    const number = '52 81 9999 9999';

    // act
    const result = phoneParser(number);

    // assert
    expect(result).toMatchObject({
      country: 'MX',
      countryCallingCode: '52',
      isValid: true,
      nationalNumber: '8199999999',
      number: '528199999999',
      raw: number,
    });
    expect(mockPatch).toBeCalledTimes(0);
  });

  it('should format a phone number from Country', () => {
    // arrange
    const number = '5538 99151 7444';

    // act
    const result = phoneParser(number);

    // assert
    expect(result).toMatchObject({
      raw: number,
      country: 'BR',
      countryCallingCode: '55',
      nationalNumber: '38991517444',
      number: '5538991517444',
      isValid: true,
    });
    expect(mockPatch).toBeCalledTimes(1);
  });

  it('should parse phone number with plus sign leading', () => {
    // arrange
    const number = '+55 38 99151 7444';

    // act
    const result = phoneParser(number);

    // assert
    expect(result).toMatchObject({
      raw: number,
      country: 'BR',
      countryCallingCode: '55',
      nationalNumber: '38991517444',
      number: '5538991517444',
      isValid: true,
    });
    expect(mockPatch).toBeCalledTimes(1);
  });

  it('should return undefined when phone number is invalid', () => {
    // arrange
    const number = '';

    // act
    const result = phoneParser(number);

    // assert
    expect(result).toBeUndefined();
    expect(mockPatch).toBeCalledTimes(0);
  });
});
