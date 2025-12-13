/**
 * Security utilities for input sanitization and XSS prevention
 */

/**
 * Sanitize user input by encoding HTML special characters
 * Prevents XSS attacks
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
  };
  
  const reg = /[&<>"'/]/ig;
  return input.replace(reg, (match) => map[match]);
};

/**
 * Validate postcode format
 * Only allows alphanumeric characters
 */
export const validatePostcode = (postcode) => {
  if (!postcode) return true; // Empty is valid for optional search
  
  // Only allow letters, numbers, and spaces
  const postcodeRegex = /^[A-Za-z0-9\s]+$/;
  return postcodeRegex.test(postcode);
};

/**
 * Validate numeric input (price, bedrooms)
 */
export const validateNumericInput = (value) => {
  if (!value) return true; // Empty is valid
  
  const num = Number(value);
  return !isNaN(num) && num >= 0;
};

/**
 * Sanitize search criteria object
 */
export const sanitizeSearchCriteria = (criteria) => {
  return {
    type: sanitizeInput(criteria.type),
    minPrice: validateNumericInput(criteria.minPrice) ? criteria.minPrice : '',
    maxPrice: validateNumericInput(criteria.maxPrice) ? criteria.maxPrice : '',
    minBedrooms: validateNumericInput(criteria.minBedrooms) ? criteria.minBedrooms : '',
    maxBedrooms: validateNumericInput(criteria.maxBedrooms) ? criteria.maxBedrooms : '',
    postcode: validatePostcode(criteria.postcode) ? sanitizeInput(criteria.postcode) : '',
    dateFrom: criteria.dateFrom,
    dateTo: criteria.dateTo
  };
};
