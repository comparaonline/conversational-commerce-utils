import { phoneSanitize } from './phone-sanitize';

describe('phone/sanitize', () => {
  it.each([
    ['(123) 456-7890', '1234567890'],
    ['123-456-7890', '1234567890'],
    ['123.456.7890', '1234567890'],
    ['1234567890', '1234567890'],
    ['+31636363634', '31636363634'],
    ['075-63546725', '07563546725'],
  ])('should sanitize phone %s to %s', (phone, expected) => {
    expect(phoneSanitize(phone)).toBe(expected);
  });
});
