import * as Joi from 'joi';
import { ENV } from './constants.env';

export const validationSchema = Joi.object({
  [ENV.PORT]: Joi.number().required(),
  [ENV.BASE_URL]: Joi.string().required(),

  [ENV.POSTGRES_USER]: Joi.string().required(),
  [ENV.POSTGRES_PASSWORD]: Joi.string().required(),
  [ENV.POSTGRES_DB]: Joi.string().required(),
  [ENV.POSTGRES_PORT]: Joi.number().required(),
  [ENV.POSTGRES_HOST]: Joi.string().required(),
  [ENV.JWT_ACCESS_SECRET]: Joi.string().required(),
  [ENV.JWT_REFRESH_SECRET]: Joi.string().required(),
  [ENV.JWT_ACCESS_EXPIRES]: Joi.string().required(),
  [ENV.JWT_REFRESH_EXPIRES]: Joi.string().required(),
});
