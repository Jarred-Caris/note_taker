// require fields
const express = require("express");
const fs = require("fs");
const uniqid = require("uniqid");
const path = require("path");

const db = "./db/db.json";

// port allocation
const PORT = process.env.PORT || 8001;

const app = express();

// Express
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// empty array for notes
let noteArray = [];

// route set up
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/api/notes", (req, res) => res.json(noteArray));

// write and read a new note and save to db.json file
app.post("/api/notes", (req, res) => {
  fs.readFile(db, (err, data) => {
    if (err) {
      console.log("Uh-Oh. Something hasnt worked");
    } else {
      const newNote = req.body;
      newNote.id = uniqid();
      noteArray.push(newNote);
      console.log("Congrats on your new note");


      

      fs.writeFile(db, JSON.stringify(noteArray), (err) => {
        if (err) {
          console.log("Something has gone wrong");
        } else {
          res.json(noteArray);
        }
      });
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
