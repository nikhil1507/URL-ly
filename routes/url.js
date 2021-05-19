const express = require("express");
const validUrl = require("valid-url");
const shortId = require("shortid");
const mongoose = require("mongoose");

const router = express.Router();

const baseUri = `http://localhost:5000`;

const Url = require("../models/urlModel");

const DB_URI = "mongodb://localhost/UrlShort";

mongoose
  .connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

router.post("/short", async (req, res) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(baseUri)) {
    return res.status(401).json("Invalid base url");
  }

  const urlCode = shortId.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      const url = await Url.findOne({ longUrl });

      if (url) {
        res.send(url);
      } else {
        const shortUrl = `${baseUri}/${urlCode}`;

        const addUrl = new Url({
          urlCode,
          longUrl,
          shortUrl,
          date: new Date(),
        });
        console.log("end");

        const result = await addUrl.save();
        res.send(result);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid error");
  }
});

module.exports = router;
