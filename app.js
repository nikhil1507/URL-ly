const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));

app.use("/", require("./routes/redirect"));
app.use("/api/url", require("./routes/url"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
