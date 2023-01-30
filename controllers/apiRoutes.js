const express = require("express");
const router = express.Router();
const path = require("path");
const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const promWrite = util.promisify(fs.writeFile);
const promRead = util.promisify(fs.readFile);

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../db/db.json"));
});

router.post("/notes", async (req, res) => {
  const { title, text } = req.body;
  let id = uuidv4();
  console.log(title, text);
  const newNoteObj = {
    id: id,
    title: title,
    text: text,
  };
  const notes = await promRead("./db/db.json", "utf8", (err, data) => {
    if (err) {
      res.send("err in reading file");
      throw err;
    } else {
      console.log(data);
      let newArr = JSON.parse(data);
      newArr.push(newNoteObj);
      promWrite("./db/db.json", JSON.stringify(newArr, null, 4), (err) =>
        err ? console.log(err) : res.send("updated")
      );
      res.send("Updated");
    }
  });

  // res.send("Data updated.");
});

router.delete("/notes/:id", (req, res) => {
  res.send(
    "depending on id of notes, we need to loop through array of objects in ../db.json to remove"
  );
});

module.exports = router;
