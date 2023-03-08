const ROLES = {
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    USER: 'user'
};
const RESPONSES = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

const RESPONSE_STATUS = {
    SUCCESS: 200,
    ERROR: 400,
};

const RESPONSE_MESSAGES = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    MISSING_FIELDS: 'Please fill all the fields',
    INVALID_EMAIL: 'Please enter a valid email',
    INVALID_PASSWORD:
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    NOT_ENOUGH_PRIVILEGES:
        'You do not have enough privileges to perform this action',
    PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
    ACCESS_DENIED: 'Access denied',
    INVALID_TOKEN: 'Invalid token',
    USER_NOT_FOUND: 'User not found',
    MISSING_TOKEN: 'Token missing',
    USER_ALREADY_EXISTS: 'User already exists',
    EMAIL_ALREADY_EXISTS: 'Email already exists',
    TOKEN_EXPIRED: 'Token expired',
    IMAGE_MISSING: 'Image missing',
    ADMIN_NOT_FOUND: 'Admin not found',
    ADMIN_UPDATED: 'Admin updated',
    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Id or password did not match',
    NO_IMAGE_UPLOADED: 'No image uploaded',
    NO_IMAGE_FOUND: 'No image found'
};

module.exports = {
    ROLES,
    RESPONSES,
    RESPONSE_STATUS,
    RESPONSE_MESSAGES
}