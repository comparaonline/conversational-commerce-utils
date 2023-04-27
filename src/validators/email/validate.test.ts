import { isEmailValid } from './validate';

describe('email/validate', () => {
  it('should validate email', () => {
    const email = 'test@test.com';

    expect(isEmailValid(email)).toBe(true);
  });

  it('should email be false with multiple spaces', () => {
    const email = '     a b c  @test.com ';

    expect(isEmailValid(email)).toBe(false);
  });

  it.each([
    'MAYUS_EMAIL@TEST.COM',
    'not_an_email',
    'local@',
    '@domain',
    '',
    undefined as unknown as string,
  ])(`should email be false with "%s"`, (email) => {
    expect(isEmailValid(email)).toBe(false);
  });

  it.each(['-', '_', '.'])('should email be true with "%s" at the middle', (char) => {
    const email = `abc${char}dfg@test.com`;

    expect(isEmailValid(email)).toBe(true);
  });

  it.each(['-', '_', '.'])('should email be false with "%s" at the end', (char) => {
    const email = `abc${char}@test.com`;

    expect(isEmailValid(email)).toBe(false);
  });
});
