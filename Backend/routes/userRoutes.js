import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

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
export default userRouter;
