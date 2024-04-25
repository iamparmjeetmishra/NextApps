import mongoose from "mongoose";
import { deflate } from "zlib";

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
   },
   email: {
      type: String,
      required: [true, 'Please provide a email'],
      unique: true,
   },
   password: {
      type: String,
   },
   isVerified: {
      type: Boolean,
      default: false
   },
   isAdmin: {
      type: Boolean,
      default: false,
   },
   forgotPassword: String,
   forgotPasswordExpiryToken: Date,
   verifyToken: String,
   verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User