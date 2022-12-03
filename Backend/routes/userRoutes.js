import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { isAuth, generateToken } from '../utils.js';

const userRouter = express.Router(); 

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          nombre: user.nombre,
          email: user.email,
          empleado: user.empleado,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Email o contraseña incorrectos' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      nombre: req.body.nombre,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      empleado: user.empleado,
      token: generateToken(user),
    });
  })
);


userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.nombre = req.body.nombre || user.nombre;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        nombre: updatedUser.nombre,
        email: updatedUser.email,
        empleado: updatedUser.empleado,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'El usuario no existe' });
    }
  })
);
export default userRouter;
