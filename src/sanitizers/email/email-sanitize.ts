export const emailSanitize = (email: string) => {
  return email
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9!#$%&'*+\-/=?^_`{|}~@.]/gi, '');
};
