import { BrasilParser } from '../brasil-parser';

describe('brasilParser', () => {
  const parser = new BrasilParser();

  it('should return the same phone number', () => {
    // arrange
    const phoneNumber = '5511999999999';

    // act
    const result = parser.patch(phoneNumber);

    // assert
    expect(result).toBe(phoneNumber);
  });

  it('should add 9 when is not set', () => {
    // arrange
    const phoneNumber = '551199999999';

    // act
    const result = parser.patch(phoneNumber);

    // assert
    expect(result).toBe('5511999999999');
  });
});
