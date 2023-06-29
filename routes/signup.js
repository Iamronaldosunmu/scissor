import express from "express";
import { handleUserSignUp, renderSignupPage } from "../controllers/signup.js";

const SignupRouter = express.Router();

SignupRouter.get("/", renderSignupPage);
SignupRouter.post("/", handleUserSignUp)
export default SignupRouter;