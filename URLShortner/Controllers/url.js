const shortid = require("shortid");
const URL = require("../Models/url");

async function handlegenerateShortenURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ msg: "url is required" });

  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render("home", { id: shortId });
}

async function handleAnaylitics(req, res) {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortId: shortID });
  res.json({
    totalClicks: result.visitHistory.length,
    Analitics: result.visitHistory,
  });
}
module.exports = { handlegenerateShortenURL, handleAnaylitics };
