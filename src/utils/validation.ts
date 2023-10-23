const REGEXP = {
  checkLogin: /^[a-zA-Z0-9-_]{3,20}$/g,
  checkPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g,
  checkPhoneNumber: /^((8|\+7)[-]?)?(\(?\d{3}\)?[-]?)?[\d-]{7,10}$/,
  checkMail: /^([\w.-])+@([\w.-])+\.([A-Za-z]{2,4})$/,
  checkName: /^[А-ЯA-Z][a-zа-я-]{1,20}$/g,
};

export const loginValidation = (value?: string) => {
  const { checkLogin } = REGEXP;
  return !value?.match(checkLogin) || value?.length < 3 || value?.length > 20;
}

export const passwordValidation = (value?: string) => {
  const { checkPassword } = REGEXP;
  return !value?.match(checkPassword) || value?.length < 8 || value?.length > 40;
};

export const mailValidation = (value?: string) => {
  const { checkMail } = REGEXP;
  return !value?.match(checkMail);
};

export const nameValidation = (value?: string) => {
  const { checkName } = REGEXP;
  return !value?.match(checkName);
};

export const phoneNumberValidation = (value?: string) => {
  const { checkPhoneNumber } = REGEXP;
  return !value?.match(checkPhoneNumber) || value?.length < 10 || value?.length > 15;
};

export const validateMessage = (value?: string) => {
  return value === '';
};

export const validateNameChat = (value: string) => {
  return value?.length === 0;
}
