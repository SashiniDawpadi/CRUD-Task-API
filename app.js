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

// put is for full update for a Object

app.put("/tasklists/:tasklistId", (req, res) => {
  TaskList.findOneAndUpdate({ _id: req.params.tasklistId }, { $set: req.body })
    .then((tasklists) => {
      res.status(200).send(tasklists);
    })
    .catch((error) => {
      console.log(error);
    });
});

// patch is partial update of one field of one Object

app.patch("/tasklists/:tasklistId", (req, res) => {
  TaskList.findOneAndUpdate({ _id: req.params.tasklistId }, { $set: req.body })
    .then((tasklists) => {
      res.status(200).send(tasklists);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.delete("/tasklists/:tasklistId", (req, res) => {
  const deleteAllContainingTask = (taskList) => {
    Task.deleteMany({ _tasklistId: req.params.tasklistId })
      .then(() => {
        return taskList;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const responseTaskList = TaskList.findByIdAndDelete({
    _id: req.params.tasklistId,
  })
    .then((tasklists) => {
      deleteAllContainingTask();
    })
    .catch((error) => {
      console.log(error);
    });
  res.status(200).send(responseTaskList);
});

// CRUD operations for tasks
app.get("/tasklists/:tasklistId/tasks", (req, res) => {
  Task.find({ _tasklistId: req.params.tasklistId })
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/tasklists/:tasklistId/tasks", (req, res) => {
  let taskObj = { title: req.body.title, _tasklistId: req.params.tasklistId };
  Task(taskObj)
    .save()
    .then((task) => {
      res.status(201).send(task);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/tasklists/:tasklistId/tasks/:taskId", (req, res) => {
  Task.find({ _tasklistId: req.params.tasklistId, _id: req.params.taskId })
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((error) => {
      console.log(error);
    });
});

// update one task belonging to one tasklist

app.patch("/tasklists/:tasklistId/tasks/:taskId", (req, res) => {
  TaskList.findOneAndUpdate(
    { _taskListId: req.params.tasklistId, _id: req.params.taskId },
    { $set: req.body }
  )
    .then((task) => {
      res.status(200).send(task);
    })
    .catch((error) => {
      console.log(error);
    });
});

// delete one task belonging to one tasklist

app.delete("/tasklists/:tasklistId/tasks/:taskId", (req, res) => {
  TaskList.findOneAndDelete({
    _taskListId: req.params.tasklistId,
    _id: req.params.taskId,
  })
    .then((task) => {
      res.status(200).send(task);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
