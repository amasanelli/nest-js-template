export enum HttpExceptionMessages {
  CREATE_ROLE_FAIL = 'The role name already exists.',
  CREATE_USER_FAIL = 'The email is already registered.',
  DIFFERENT_PASSWORD = 'The new password must be different from the old password.',
  LOGIN_FAIL = 'Authentication failed. Please check email and password.',
  READ_ROLE_FAIL = 'The role id number does not exist.',
  READ_ROLE_NAME_FAIL = 'The role name does not exist.',
  READ_USER_FAIL = 'The user does not exist.',
  READ_USER_ROLE_FAIL = 'The user role id does not exist',
  REFRESH_FAIL = 'Authentication failed. Please check refresh token.',
  SAME_PASSWORD_FAIL = 'The password confirmation does not match.',
  VALID_ROLE_NAMES = 'Role names format: ADMIN_ or USER_ and four or more numbers or letters (excluding ADMIN and USER).',
}
