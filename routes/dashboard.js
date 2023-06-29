import express from "express";
import {
  createCustomLink,
  createNewLink,
  renderPage,
  viewLinkAnalytics,
  viewLinkHistory,
} from "../controllers/dashboard.js";
import dotenv from "dotenv";

dotenv.config();

const Router = express.Router();

Router.get(
  "/shorten",
  renderPage("dashboard/shorten", {
    errorMessage: "",
    longLink: "",
    shortLink: "",
    qrCode: "",
  })
);
Router.get("/analytics", viewLinkAnalytics);
Router.get(
  "/custom-url",
  renderPage("dashboard/custom-url", {
    errorMessage: "",
    longLink: "",
    shortLink: "",
    host: process.env.HOST + "/",
    qrCode: "",
  })
);
Router.get("/link-history", viewLinkHistory);

Router.post("/shorten", createNewLink);
Router.post("/custom-url", createCustomLink);

export default Router;
