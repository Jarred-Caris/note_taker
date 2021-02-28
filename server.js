const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const uniqid = require("iniqid")

let note = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
  