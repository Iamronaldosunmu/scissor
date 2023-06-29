import Joi from "joi";
import mongoose from "mongoose";

const linkSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    shortLink: {
      type: String,
      required: true,
    },
    longLink: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    qrCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Link = mongoose.model("Link", linkSchema);

export default Link;

export const validateLink = (link) => {
  const schema = Joi.object({ link: Joi.string().uri().required() });
  return schema.validate({ link });
};
