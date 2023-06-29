import mongoose from "mongoose";
import Joi from "joi";
import bcrypt from "bcrypt";

export const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.isValidPassword = async (
  password_supplied,
  user_password
) => {
  const isValid = await bcrypt.compare(password_supplied, user_password);
  return isValid;
};

const User = mongoose.model("User", userSchema);

export const validateUser = (payload) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .required()
      .min(3)
      .max(50),
    password: Joi.string().min(8).max(50).required(),
  });

  return schema.validate(payload);
};

export const validateUserSignup = (payload) => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(50),
    lastName: Joi.string().required().min(3).max(50),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .required()
      .min(3)
      .max(50),
    password: Joi.string().min(8).max(50).required(),
    confirmPassword: Joi.string().min(8).max(50).required(),
  });

  return schema.validate(payload);
};

export default User;
