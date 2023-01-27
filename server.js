const express = require("express");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("we did it!");
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
