export const phoneSanitize = (phone: string) => {
  return phone.replace(/[^0-9]/g, '');
};
