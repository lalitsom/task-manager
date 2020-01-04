const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

// add task
router.post("/task", async (req, res) => {
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

router.get("/tasks", async (req, res) => {
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

router.get("/task/:id", async (req, res) => {
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

// update task

router.patch("/task/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    console.log("Update failed", e);
    res.status(400).send(e);
  }
});

// delete task

router.delete("/task/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    return res.send(task);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
