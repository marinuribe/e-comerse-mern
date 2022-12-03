import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      empleado: user.empleado,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  ); //encripta los datos
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Token invalido' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'El token no existe' });
  }
};

export const empleado = (req, res, next) => {
  if (req.user && req.user.empleado) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};