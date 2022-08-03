export enum HttpExceptionMessages {
  // DIFFERENT_PASSWORD = 'The new password must be different from the old password.',
  // READ_USER_ROLE_FAIL = 'The user role id does not exist',
  // REFRESH_FAIL = 'Authentication failed. Please check refresh token.',
  // SAME_PASSWORD_FAIL = 'The password confirmation does not match.',
  
  READ_USER_NAME_FAIL = 'The user email does not exist.',
  READ_USER_FAIL = 'The user does not exist.',
  CREATE_USER_FAIL = 'The user email is already registered.',
  READ_ROLE_FAIL = 'The role does not exist.',
  CREATE_ROLE_FAIL = 'The combination of role name and type already exists.',
  INVALID_ROLE_TYPE = 'Invalid role type',
  LOGIN_FAIL = 'Authentication failed. Please check email and password.',
  INVALID_LOGIN_DATA = 'Missing email or password.',
}
