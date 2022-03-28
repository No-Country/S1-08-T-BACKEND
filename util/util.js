import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();


export const generateToken = (user) =>{
    return jwt.sign({
        id: user.username,
        username: user.username,
        email: user.email
    },
    process.env.JWT_SECRET || 'somethingsecrect',
    {
        expiresIn: '30d'
    }
    )
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(
        token,
        process.env.JWT_SECRET || 'somethingsecret',
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: 'Invalid Token' });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: 'No Token' });
    }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};