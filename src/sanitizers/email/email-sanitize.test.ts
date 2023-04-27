import { emailSanitize } from './email-sanitize';

describe('email/emailSanitize', () => {
  it('should sanitize email', () => {
    const email = 'abc @test.com';

    expect(emailSanitize(email)).toBe('abc@test.com');
  });

  it('should sanitize email with multiple spaces', () => {
    const email = '     a b c  @test.com ';

    expect(emailSanitize(email)).toBe('abc@test.com');
  });

  it('should sanitize email with multiple spaces and tabs', () => {
    const email = ' a b c @test.com ';

    expect(emailSanitize(email)).toBe('abc@test.com');
  });

  it('should trim email', () => {
    const email = ' abc@test.com      ';

    expect(emailSanitize(email)).toBe('abc@test.com');
  });

  it.each([
    '!',
    '#',
    '$',
    '%',
    '&',
    "'",
    '*',
    '+',
    '/',
    '=',
    '?',
    '^',
    '_',
    '`',
    '{',
    '|',
    '}',
    '~',
  ])(`should let %s in email`, (char) => {
    const email = `abc${char}dfg@test.com`;

    expect(emailSanitize(email)).toBe(email);
  });

  it.each(['-', '_', '.'])(`should let %s in email`, (char) => {
    const email = `abc${char}dfg@test.com`;

    expect(emailSanitize(email)).toBe(email);
  });
});
