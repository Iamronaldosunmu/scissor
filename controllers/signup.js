import User, { validateUserSignup } from "../models/user.js";
import bcrypt from "bcrypt";

export function renderSignupPage(req, res) {
  return res.render("signup", { errorMessage: "" });
}

export async function handleUserSignUp(req, res) {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const { error } = validateUserSignup(req.body);

  // Validate the Input
  if (error)
    return res.render("signup", { errorMessage: error.details[0].message });

  // Check if Password and Confrim Password Match
  if (password !== confirmPassword)
    return res.render("signup", {
      errorMessage: "Password and Confirm Password do not match",
    });

  // Check if the user already exists in the DB
  let user = await User.findOne({ email });
  if (user)
    return res.render("signup", {
      errorMessage: "An account with this email already exists, Please Log in",
    });

  // Hash the password
  const saltRounds = 10;
  const hashed_password = await bcrypt.hash(password, saltRounds);

  user = await User.create({
    email,
    password: hashed_password,
    firstName,
    lastName,
  });

  let session = req.session;
  session.user = user;
  console.log(req.session);

  return res.redirect("/dashboard/shorten");
}
