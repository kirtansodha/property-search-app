# Security Measures

## Client-Side Security Implementation

### 1. Content Security Policy (CSP)
Implemented in `index.html` to prevent XSS attacks:
- Restricts script sources to self and inline scripts
- Limits image sources to HTTPS and data URIs
- Restricts frame sources to Google Maps only
- Prevents inline script execution from unauthorized sources

### 2. Input Sanitization
All user inputs are sanitized in `utils/security.js`:
- HTML encoding of special characters (<, >, &, ", ', /)
- Prevents script injection through form fields
- Validates postcode format (alphanumeric only)
- Validates numeric inputs (price, bedrooms)

### 3. XSS Protection Headers
Added security headers in `index.html`:
- `X-Content-Type-Options: nosniff` - Prevents MIME-sniffing
- `X-Frame-Options: SAMEORIGIN` - Prevents clickjacking
- `Referrer-Policy` - Controls referrer information

### 4. React Built-in Protection
- React automatically escapes values in JSX
- Prevents XSS through DOM manipulation
- Safe handling of user-generated content

### 5. Input Validation
- Postcode validation: Only alphanumeric characters allowed
- Numeric validation: Ensures price/bedroom values are valid numbers
- Date validation: HTML5 date inputs prevent invalid formats

## Security Testing
All form inputs are validated and sanitized before processing to ensure:
- No script injection possible
- No HTML injection possible
- No SQL injection (client-side app with JSON data)
- Safe handling of all user inputs
