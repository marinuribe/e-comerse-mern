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
