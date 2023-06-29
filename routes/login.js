import express from "express";
import { handleUserLogin, renderLoginPage } from "../controllers/login.js";

const LoginRouter = express.Router();

LoginRouter.get("/", renderLoginPage);
LoginRouter.post("/", handleUserLogin);

export default LoginRouter;
