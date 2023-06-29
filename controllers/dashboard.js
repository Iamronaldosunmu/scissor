import shortid from "shortid";
import dotenv from "dotenv";
import Link, { validateLink } from "../models/link.js";
import QRCode from "qrcode";

dotenv.config();

export const renderPage = (route, payload = {}) => {
  return (req, res) => {
    let session = req.session;
    if (!session.user) return res.redirect("/login");

    return res.render(route, { ...session.user, ...payload });
  };
};

export const createNewLink = async (req, res) => {
  const { originalUrl: longLink } = req.body;
  const { error } = validateLink(longLink);

  if (error)
    return res.render("dashboard/shorten", {
      ...req.session.user,
      errorMessage: "This is not a valid link",
      longLink: "",
      shortLink: "",
      qrCode: "",
    });

  if (!req.session.user) return res.redirect("/login");
  const user = req.session.user._id;
  const shortID = shortid.generate();
  const shortLink = process.env.HOST + "/" + shortID;
  let qrcodedataurl = "";

  //Generate the QR code
  QRCode.toDataURL(shortLink, async function (err, url) {
    if (err) throw err;
    qrcodedataurl = url;
    const link = new Link({
      longLink,
      user,
      shortLink,
      qrCode: qrcodedataurl,
    });
    console.log(longLink, link);

    await link.save();

    return res.render("dashboard/shorten", {
      ...req.session.user,
      errorMessage: "",
      longLink,
      shortLink,
      qrCode: qrcodedataurl,
    });
  });
};

export const createCustomLink = async (req, res) => {
  const { originalUrl: longLink, customUrl } = req.body;
  const user = req.session?.user?._id;
  const { error } = validateLink(longLink);

  if (error)
    return res.render("dashboard/custom-url", {
      ...req.session.user,
      errorMessage: "This is not a valid link",
      longLink: "",
      shortLink: "",
      host: process.env.HOST + "/",
      qrCode: "",
    });

  if (customUrl.split(" ").length > 1 || !customUrl) {
    return res.render("dashboard/custom-url", {
      ...req.session.user,
      errorMessage: "This is not a valid custom url",
      longLink: "",
      shortLink: "",
      host: process.env.HOST + "/",
      qrCode: "",
    });
  }

  let customLink = process.env.HOST + "/" + customUrl;

  let shortLink = await Link.findOne({ shortLink: customLink });
  console.log(shortLink);

  if (shortLink) {
    return res.render("dashboard/custom-url", {
      ...req.session.user,
      errorMessage: "This custom url already exists",
      longLink: "",
      shortLink: "",
      host: process.env.HOST + "/",
      qrCode: "",
    });
  }

  QRCode.toDataURL(customLink, async function (err, url) {
    if (err) throw err;

    const link = new Link({
      longLink,
      user,
      shortLink: customLink,
      qrCode: url,
    });

    await link.save();

    return res.render("dashboard/custom-url", {
      ...req.session.user,
      errorMessage: "",
      longLink,
      shortLink: customLink,
      qrCode: url,
    });
  });
};

export const viewLinkHistory = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  const links = await Link.find({ user: req.session.user._id });

  return res.render("dashboard/link-history", { ...req.session.user, links });
};

export const viewLinkAnalytics = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const links = await Link.find({ user: req.session.user._id });
  return res.render("dashboard/analytics", { ...req.session.user, links });
};
