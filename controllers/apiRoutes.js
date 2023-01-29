const express = require("express");
const router = express.Router();
const path = require("path");
const util = require("util");
const fs = require("fs");
const promWrite = util.promisify(fs.writeFile);
const promRead = util.promisify(fs.readFile);

router.get("/notes", (req, res) =>
  res.send("this is where we need to send notes back to js, see line 28")
);

router.post("/notes", async (req, res) => {
  const noteReceived = req.body;
  const notes = await promRead("./db/db.json", "utf8", (err, data) => {
    if (err) {
      res.send("err in reading file");
      throw err;
    } else {
      console.log(data);
      let newArr = JSON.parse(data);
      newArr.push(req.body);
      promWrite("./db/db.json", JSON.stringify(newArr, null, 4), (err) =>
        err ? console.log(err) : res.send("updated")
      );
      return;
    }
  });

  res.send(
    "need to write to ../db.json here, check the req.body when receiving."
  );
});

router.delete("/notes/:id", (req, res) => {
  res.send(
    "depending on id of notes, we need to loop through array of objects in ../db.json to remove"
  );
});

module.exports = router;
