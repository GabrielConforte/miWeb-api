import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config.js';

export function generateToken(user) {
    return jwt.sign({ email: user.email, id: user.id, roles: user.roles }, SECRET_KEY, { expiresIn: '2h', algorithm: 'HS256' });
}

async function verifyToken(token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return null;
    }
  }

export async function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ').pop()
    const tokenData = await verifyToken(token);
    if (tokenData){
      req.user = tokenData;
      next();
    }
    else {
      res.status(401)
      res.send({error: 'Invalid'})
    }
  } catch (err) {
    console.log(err);
  }
  
}