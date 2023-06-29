import express from "express";
import withMiddleware from "./startup/middleware.js";
import withRoutes from "./startup/routes.js";
import connectToDB from "./startup/db.js";

const app = express();
const port = process.env.port || 4001;

withMiddleware(app);
// Routes for rendering the views
app.get("/", (req, res) => {
  return res.render("index");
});
withRoutes(app);

app.listen(port, () => console.log(`[server]: Running on port ${port}`));
connectToDB();


// app.get("/login", (req, res) => {
//   return res.render("login");
// });

// app.get("/signup", (req, res) => {
//   return res.render("signup");
// });

// app.get("/dashboard", (req, res) => {
//   return res.render("dashboard");
// });

// app.get("/dashboard/analytics", (req, res) => {
//   return res.render("dashboard/analytics");
// });
// app.get("/dashboard/shorten", (req, res) => {
//   return res.render("dashboard/shorten");
// });
// app.get("/dashboard/custom-url", (req, res) => {
//   return res.render("dashboard/custom-url");
// });
// app.get("/dashboard/qr-codes", (req, res) => {
//   return res.render("dashboard/qr-codes");
// });
// app.get("/dashboard/link-history", (req, res) => {
//   return res.render("dashboard/link-history");
// });

// // Routes for handling the logic
// app.post("/login", (req, res) => {
//   console.log(req.body);
//   console.log("This is working");
//   return;
// });
