import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  { 
    DNI: {type: Number, required: false},
    nombre: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    empleado: { type: Boolean, default: false, required: true}

  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;