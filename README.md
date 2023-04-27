# README

## @comparaonline/conversation-commerce-utils

This package contains utility functions for conversational commerce at ComparaOnline.com. It includes functionality for formatting, validating, and parsing phone and email data.

### Installation

To use this package, you can install it via NPM:

```
npm install --save @comparaonline/conversation-commerce-utils
```

### Usage

#### Sanitizing

To sanitize phone and email data, you can use the following functions:

```
import { phoneSanitize, emailSanitize } from '@comparaonline/conversation-commerce-utils';

const sanitizedPhone = phoneSanitize('123-456-7890');
const sanitizedEmail = emailSanitize('TEST@EXAMPLE.COM');
```

`phoneSanitize` will remove all non-numeric characters from the phone number, and `emailSanitize` will lowercase the email address, remove any whitespace, and remove any characters that are not letters, numbers, or the following special characters: `!#$%&'*+-/=?^_`{|}~@.`.

#### Validation

To validate email addresses, you can use the `isEmailValid` function:

```
import { isEmailValid } from '@comparaonline/conversation-commerce-utils';

const isValidEmail = isEmailValid('test@example.com');
```

`isEmailValid` will return `true` if the email address is valid according to the following criteria:

- The email address has exactly one "@" symbol
- The local part of the email address (the part before the "@") matches the regular expression `/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)\*$/`
- The domain part of the email address (the part after the "@") matches the regular expression defined in the `isValidDomainPart` function.

#### Parsing

To parse phone numbers from different countries and formats, you can use the `phoneParser` function:

```
import { phoneParser } from '@comparaonline/conversation-commerce-utils';

const parsedPhone = phoneParser('+1 (555) 123-4567');
```

`phoneParser` will return an object with the following properties:

- `raw`: The raw input string that was passed to the function
- `country`: The ISO 3166-1 alpha-2 country code for the country that the phone number belongs to
- `countryCallingCode`: The calling code for the country that the phone number belongs to (e.g. "1" for the United States and Canada)
- `nationalNumber`: The national significant number for the phone number (i.e. the part of the phone number that comes after the country calling code)
- `number`: The phone number in the format used by WhatsApp (i.e. with any necessary prefixes or changes to the national number)
- `isValid`: Whether the phone number is valid according to the rules for the country that it belongs to.

### Contributing

If you would like to contribute to this project, please see the CONTRIBUTING.md file for more information.

### License

This project is licensed under the MIT License. See the LICENSE.md file for more information.
