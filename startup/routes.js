import error from "../middleware/error.js";
import LoginRouter from "../routes/login.js";
import SignupRouter from "../routes/signup.js";
import DashboardRouter from "../routes/dashboard.js";
import Router from "../routes/home.js";

export default function withRoutes(app) {
  app.use("/login", LoginRouter);
  app.use("/signup", SignupRouter);
  app.use("/dashboard", DashboardRouter);
  app.use("/", Router);
  app.use(error);
}
