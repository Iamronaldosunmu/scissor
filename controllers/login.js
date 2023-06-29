import passportLocal from "passport-local";
import User, { validateUser } from "../models/user.js";

const localStrategy = passportLocal.Strategy;

export function renderLoginPage(req, res) {
  return res.render("login", { errorMessage: "" });
}

export async function handleUserLogin(req, res) {

  const { email, password } = req.body;
  // Validate the data sent by the user
  const { error } = validateUser(req.body);
  if (error)
    return res.render("login", { errorMessage: error.details[0].message });

  // Check if the user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.render("login", {
      errorMessage: "This user does not exist, Please Sign Up",
    });
  }

  // Check if the password is correct
  const valid = await user.isValidPassword(password, user.password);
  if (!valid) {
    return res.render({ errorMessage: "Incorrect Username or Password" });
  }

  // Handle the login with Session since password is correct
  let session = req.session;
  session.user = user;
  return res.redirect("/dashboard/shorten");
}

// const JWTstrategy = passportJwt.Strategy;
// const ExtractJWT = passportJwt.ExtractJwt;

// Passport function to handle the login process
// passport.use(
//   "login",
//   new localStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: true,
//       session: false,
//     },
//     async (req, email, password, done) => {
//       // Validate the data sent by the user
//       const { error } = validateUser(req.body);
//       if (error)
//         return req.res.status(400).json({ message: error.details[0].message });

//       try {
//         // Check if the user exists in the database
//         const user = await User.findOne({ email });
//         if (!user) {
//           return req.res
//             .status(400)
//             .json({ message: "This user does not exist, Please Sign Up" });
//         }

//         // Check if the password is correct
//         const valid = await user.isValidPassword(password, user.password);
//         if (!valid) {
//           return req.res
//             .status(400)
//             .json({ message: "Incorrect Username or Password" });
//         }

//         return done(null, user, { message: "Logged in Successfully" });
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// // This is the controller for signing a user up
// export const createNewUser = async (req, res) => {
//   const { applicantId } = req.user;
//   const { password, ...user } = req.user._doc;
//   const token = jwt.sign({ ...user, applicantId }, process.env.JWT_SECRET);
//   console.log({ ...user, applicantId });
//   return res
//     .status(201)
//     .json({ message: "Sign up Successful!", user: user, token, applicantId });
// };

// export const logUserIn = async (req, res) => {
//   const { password, ...user } = req.user._doc;
//   const applicant = await Applicant.findOne({ user: user._id });
//   console.log({ ...user, applicantId: applicant._id });
//   const token = jwt.sign(
//     { ...user, applicantId: applicant._id },
//     process.env.JWT_SECRET
//   );
//   return res.status(200).json({ message: "Log In Successful!", token });
// };

// export const sendPasswordReset = async (req, res) => {
//   const schema = Joi.object({
//     email: Joi.string()
//       .email({ minDomainSegments: 2, tlds: { allow: false } })
//       .required()
//       .min(3)
//       .max(50),
//   });
//   const { error } = schema.validate(req.body);
//   if (error) return res.status(400).json({ message: error.details[0].message });

//   const user = await User.findOne({ email: req.body.email });
//   if (!user)
//     return res.status(400).json({ message: "This user does not exist!" });

//   const secret = process.env.JWT_SECRET;

//   const token = Jwt.sign(
//     {
//       _id: user._id,
//       email: user.email,
//     },
//     secret,
//     { expiresIn: "15m" }
//   );

// };
