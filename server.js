const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const uniqid = require("uniqid");

let note = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/add", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/db/db.json"))
);

app.post("/api/notes", (req, res) => {
  const newNote = req.body;

  newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
  console.log(newNote);

  note.push(newNote);
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
