// Validation utility functions

export const validateEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

export const validatePhone = (phone) => {
  if (!phone) return false;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
  return phoneRegex.test(cleanPhone);
};

export const validateName = (name) => {
  if (!name) return false;
  const trimmedName = name.trim();
  return trimmedName.length >= 2 && trimmedName.length <= 50 && /^[a-zA-Z\s]+$/.test(trimmedName);
};

export const validatePassword = (password) => {
  if (!password) return false;
  return password.length >= 8 && 
         password.length <= 50 &&
         /[A-Z]/.test(password) && 
         /[a-z]/.test(password) && 
         /[0-9]/.test(password);
};

export const validateMessage = (message) => {
  if (!message) return false;
  const trimmedMessage = message.trim();
  return trimmedMessage.length >= 10 && trimmedMessage.length <= 1000;
};

export const validateAmount = (amount) => {
  return !isNaN(amount) && parseFloat(amount) > 0;
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const getErrorMessage = (field, value) => {
  switch(field) {
    case 'email':
      if (!validateRequired(value)) return 'Email is required';
      if (!validateEmail(value)) return 'Please enter a valid email address';
      return '';
    case 'phone':
    case 'mobile':
      if (!validateRequired(value)) return 'Phone number is required';
      if (!validatePhone(value)) return 'Please enter a valid 10-digit Indian mobile number';
      return '';
    case 'name':
      if (!validateRequired(value)) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      if (value.trim().length > 50) return 'Name must not exceed 50 characters';
      if (!validateName(value)) return 'Name should contain only letters and spaces';
      return '';
    case 'password':
      if (!validateRequired(value)) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
      if (value.length > 50) return 'Password must not exceed 50 characters';
      if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
      if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
      if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
      return '';
    case 'confirmPassword':
      if (!validateRequired(value)) return 'Please confirm your password';
      return '';
    case 'message':
      if (!validateRequired(value)) return 'Message is required';
      if (value.trim().length < 10) return 'Message must be at least 10 characters';
      if (value.trim().length > 1000) return 'Message must not exceed 1000 characters';
      return '';
    case 'amount':
      if (!validateRequired(value)) return 'Amount is required';
      if (!validateAmount(value)) return 'Please enter a valid amount';
      return '';
    default:
      if (!validateRequired(value)) return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      return '';
  }
};

export const validateForm = (formData, fields) => {
  const errors = {};
  fields.forEach(field => {
    const error = getErrorMessage(field, formData[field]);
    if (error) {
      errors[field] = error;
    }
  });
  return errors;
};
