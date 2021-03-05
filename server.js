const express = require("express");
const fs = require("fs");
const uniqid = require("uniqid");
const path = require("path");

const db = "./db/db.json";
const PORT = process.env.PORT || 8001;

const app = express();

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


app.get("/api/notes", (req, res) => res.json(noteArray)); 


app.post("/api/notes", (req, res) => {
  const newNote = req.body;
      noteArray.JSON.parse(res);
      newNote.id = uniqid();
      console.log("Congrats on your new note");
    fs.readFile(db, (err, res) => {
    if (err) throw err; 
      
    
      fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(noteArray, (err) => {
        if (err) {
          console.log("Something has gone wrong")
        } else {
          res.json(noteArray);
          noteArray.push(newNote);
          console.log(noteArray)
        }
      }))
    
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
