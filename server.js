const express = require("express");
const app = express();
const path = require("path");
const db = "./db/db.json";

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let noteArray = [];

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => res.json(noteArray));

const fs = require("fs");
const uniqid = require("uniqid");

app.post("/api/notes", (req, res) => {
  fs.readFile(db, (err, data) => {
    if (err) {
      console.log("Uh-Oh. Something hasnt worked");
    } else {
      const newNote = req.body;
      noteArray.JSON.parse(res);
      newNote.id = uniqid();
      noteArray.push(newNote);
      console.log("Congrats on your new note");
    }
  });
});


// writefile code------->


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
