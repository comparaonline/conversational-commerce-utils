export const isEmailValid = (email: string) => {
  if (!email || typeof email !== 'string') return false;
  const emailParts = email.split('@');
  if (emailParts.length !== 2) return false;
  const [localPart, domainPart] = emailParts;

  if (!isValidLocalPart(localPart)) return false;
  if (!isValidDomainPart(domainPart)) return false;

  return true;
};

const isValidLocalPart = (localPart: string) => {
  const localPartRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
  // eslint-disable-next-line no-useless-escape
  const invalidEdgeChars = /[_\.-]$/;

  if (localPart.match(invalidEdgeChars)) return false;
  return localPart.match(localPartRegex);
};

const isValidDomainPart = (domainPart: string) => {
  const domainPartRegex =
    // eslint-disable-next-line no-control-regex
    /^(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\u0001-\u0008\u000B\u000C\u000E-\u001F\u0021-\u005A\u0053-\u007F]|\\[\u0001-\u0009\u000B\u000C\u000E-\u007F])+)\])$/;
  return domainPartRegex.test(domainPart);
};
