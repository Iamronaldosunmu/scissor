import express from "express";
import dotenv from "dotenv";
import Link from "../models/link.js";

const Router = express.Router();

Router.get("/:urlEnding", async (req, res) => {
  const { urlEnding } = req.params;
  const actualLink = process.env.HOST + "/" + urlEnding;

  const link = await Link.findOne({ shortLink: actualLink });
  if (!link) {
  } else {
    link.clicks = link.clicks + 1;
    await link.save();
    console.log(link)
    return res.redirect(link.longLink);
  }
});

export default Router;
