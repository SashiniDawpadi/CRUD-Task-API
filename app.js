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

app.get("/tasklists/:tasklistId", (req, res) => {
  let tasklistId = req.params.tasklistId;
  TaskList.find({ _id: tasklistId })
    .then((taskList) => {
      res.status(200).send(taskList);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/tasklists", (req, res) => {
  let taskListObj = { title: req.body.title };
  TaskList(taskListObj)
    .save()
    .then((lists) => {
      res.status(201).send(lists);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.put("/tasklists/:tasklistId", (req, res) => {
  TaskList.findOneAndUpdate({ _id: req.params.tasklistId }, { $set: req.body })
    .then((tasklists) => {
      res.status(200).send(tasklists);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.delete("/tasklists/:tasklistId", (req, res) => {
  TaskList.findByIdAndDelete({ _id: req.params.tasklistId })
    .then((tasklists) => {
      res.status(200).send(tasklists);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
