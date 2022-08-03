import * as Joi from 'joi';

export const validationSchema = Joi.object({
  APP_PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),

  SALT_ROUNDS: Joi.string().default('10'),

  MYSQL_TYPE: Joi.string().default('mysql'),
  MYSQL_HOST: Joi.string().default('localhost'),
  MYSQL_PORT: Joi.number().default(3306),
  MYSQL_USERNAME: Joi.string().default('user'),
  MYSQL_PASSWORD: Joi.string().default('user'),
  MYSQL_DATABASE: Joi.string().default('dev-db'),

  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRATION: Joi.string().default('1d'),

  GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
  GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_AUTH_CALLBACK_URL: Joi.string().required(),
});
