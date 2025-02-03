export interface IValidation {
  rule: (value: any, fieldName: string, args?: any) => string;
  args?: any;
}

export const validationRules = {
  required: (val: any, fieldName: string) =>
    !val ? `${fieldName} is required.` : "",
  name: (name: string, fieldName: string) => {
    const nameRegex = /^[a-zA-Z]/;
    return !nameRegex.test(String(name).toLowerCase())
      ? `You're not allowed to use special characters or numbers in your ${fieldName}.`
      : "";
  },
  email: (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return !emailRegex.test(String(email).toLowerCase())
      ? "Email must be in a valid format"
      : "";
  },
  phone: (phone: string, fieldName: string, optional: boolean) => {
    const mobileRegex = /^\d{10}$/;
    if (!phone && optional) {
      return "";
    }
    return !mobileRegex.test(phone) ? `Invalid ${fieldName}` : "";
  },
  password: (password: string) => {
    const passwordRegex =
      /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;
    return !passwordRegex.test(String(password))
      ? "Your password should contain 8 digit and it must be secure and strong. eg: abc@1442AgjdjK"
      : "";
  },
  length: (value: any, fieldName: string, length: number) => {
    return parseInt(value.length) === length
      ? ``
      : `${fieldName} should containn ${length} digit`;
  },
  maxLength: (value: any, fieldName: string, length: number) => {
    return parseInt(value) > length
      ? `${fieldName} can not exceed ${length} characters`
      : "";
  },
  minLength: (value: any, fieldName: string, length: number) => {
    return parseInt(value) < length
      ? `${fieldName} must contain ${length} characters`
      : "";
  },
};
