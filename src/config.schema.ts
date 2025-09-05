import Joi from '@hapi/joi';

// Define the validation schema for environment variables
// we use this schema in app.module.ts
// to validate the environment variables when the application starts
// and shows an error if any variable is missing or invalid
export const configValidationSchema = Joi.object({
  STAGE: Joi.string().valid('dev', 'prod', 'test').required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
});
