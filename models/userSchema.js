import mongoose from "mongoose";;
import bcrypt from 'bcryptjs'
import validator from "validator";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter your name"],
        minLength:[3, "Name must be contain atLeast 3 character"],
        maxLength:[20, "Name cannot exceed more than 20 character"]
    },
    email: {
        type: String,
        required: [true, "Please enter your Email!"],
        validate: [validator.isEmail, "Please provide a valid Email!"],
      },
      phone: {
        type: Number,
        required: [true, "Please enter your Phone Number!"],
      },
      password: {
        type: String,
        required: [true, "Please provide a Password!"],
        minLength: [8, "Password must contain at least 8 characters!"],
        maxLength: [32, "Password cannot exceed 32 characters!"],
        select: false,
      },
      role: {
        type: String,
        required: [true, "Please select a role"],
        enum: ["Admin", "normal"],
        default: 'normal'
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
   
  userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  export const User = mongoose.model("User", userSchema);
  