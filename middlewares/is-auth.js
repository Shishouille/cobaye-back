import jwt from 'jsonwebtoken';
import HttpError from '../config/HttpError.js';

export default (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw new HttpError(400, 'Not authenticated.');
  }
  const [,token] = authHeader.split(' ');
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
  } catch (err) {
    throw new HttpError(500);
  }
  if (!decodedToken) {
    throw new HttpError(400, 'Not authenticated.');
  }
  req.userId = decodedToken.userId;
  next();
};
