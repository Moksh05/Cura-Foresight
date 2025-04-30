import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  bloodType: { type: String },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});


UserSchema.pre('save',async function(next){
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(this.password, salt)
  this.password = hashPassword;
  // Call next to continue saving the document
  next();

})

export default mongoose.model("User", UserSchema);