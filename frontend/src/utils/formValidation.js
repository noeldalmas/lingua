// src/utils/formValidation.js
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  // Password must be at least 8 characters long and contain at least one number and one special character
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
  return re.test(String(password));
};

export const validateRequired = (value) => {
  return value.trim() !== "";
};

export const validateMatch = (value1, value2) => {
  return value1 === value2;
};
