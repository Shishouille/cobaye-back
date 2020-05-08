import cors from 'cors';
import env from '../config/env.js';
import HttpError from '../config/HttpError.js';

const whitelist = env.get('whitelist');

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new HttpError(403, 'CORS policy'))
    }
  }
};

export const corsMiddleware = cors.bind(this, corsOptions);
export const headersMiddleware = (req, res, next) => {
  console.log(req, res);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}
