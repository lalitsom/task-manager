const express = require("express");
const app = express();
const port = process.env.port || 3000;
require("./db/mongoose");
const User = require("./db/models/user");
const Task = require("./db/models/task");

app.use(express.json());

app.post("/user", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    console.log("Successs", user);
    res.status(201).send("Successful addition");
  } catch (e) {
    console.log("Error", e);
    res.status(400).send("error in adding user");
  }
});

//get all users

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    console.log("found" + users);
    res.send(users);
  } catch (e) {
    console.log(e);
    res.send("unable to fetch users");
  }
});


//get  user by id

app.get("/user/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) {
      console.log("not found");
      return res.status(404).send();
    }
    console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send("unable to fetch user");
  }
});



// add task
app.post("/task", async (req, res) => {
  console.log("path", req.path);

  try {
    const task = new Task(req.body);
    await task.save();
    console.log("Successs", task);
    res.send("Succesful addition of task");
  } catch (error) {
    console.log("Error task", error);
    res.status(400).send("error in adding task");
  }
});

//get all tasks

app.get("/tasks", async (req, res) => {
  try {
    tasks = await Task.find({});
    console.log(tasks);
    res.send(tasks);
  } catch (e) {
    console.log(e);
    res.send("unable to fetch tasks");
  }
});

//get  task by id

app.get("/task/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const tasks = await Task.findById(_id);
    if (!tasks) {
      console.log("not found");
      return res.status(404).send();
    }
    console.log(tasks);
    res.send(tasks);
  } catch (e) {
    console.log(e);
    res.send("unable to fetch task");
  }
});

app.listen(port, () => {
  console.log("Server started on port", port);
});
