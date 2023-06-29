import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import apiLimiter from "../middleware/rate-limit.js";

export default function withMiddleware(app) {
  app.use(apiLimiter);
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    session({
      secret: "thisismysecretsessionkey",
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24 }, // One Day
      resave: false,
    })
  );
  app.use(cookieParser());
}
