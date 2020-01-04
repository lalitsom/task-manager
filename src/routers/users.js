const express = require("express");
const router = new express.Router();
const User = require("../models/user");
console.log(User)
router.post("/user", async (req, res) => {
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

router.get("/users", async (req, res) => {
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

router.get("/user/:id", async (req, res) => {
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

// update user

router.patch("/user/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    console.log("Update failed", e);
    res.status(400).send(e);
  }
});

// delete user

router.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    return res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
