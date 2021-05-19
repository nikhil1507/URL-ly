const express = require("express");

const router = express.Router();

const Url = require("../models/urlModel");

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({
      urlCode: req.params.code,
    });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("URL not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
});

module.exports = router;
