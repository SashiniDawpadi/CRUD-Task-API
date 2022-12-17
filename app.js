const { request, response } = require("express");
const express = require("express");
const app = express();
const mongoose = require("./database/mongoose");

const TaskList = require("./database/models/taskList");
const Task = require("./database/models/task");

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Pass to next layer of middleware
  next();
});

app.use(express.json()); // or body parser

//Routes
app.get("/taskLists", (req, res) => {
  TaskList.find({})
    .then((lists) => {
      res.send(lists);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
