const express = require("express");
const { UserModel } = require("../Models/User");

const userRouter = express.Router();
//Get user
userRouter.get("/", async (req, res) => {
  try {
    const user = await UserModel.find();
    res.send(user);
    res.status(200);
  } catch (err) {
    res.status(400).json({ err: err.message });
    console.log(err);
  }
});
userRouter.get("/read/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserModel.findOne({ _id: id });
    res.status(200).send({ msg: "get particular user successfully.", user: user });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
//Create a new user
userRouter.post("/create", async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    const ifUserPresent = await UserModel.findOne({ email });
    if (ifUserPresent) {
      return res.status(400).json({ msg: "Book already present" });
    } else {
      const adduser = new UserModel({ name, email, mobile });
      await adduser.save();

      res.send({ msg: "user added successfully" });
    }
  } catch (error) {
    res.status(401).send({ msg: "Bad Request 404", ok: false, err: error.messmobile });
  }
});

//put specific user
userRouter.put("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const Payload = req.body;
  try {
    await UserModel.findByIdAndUpdate({ _id: ID }, Payload);
    res.status(201).send({ msg: "User Updated SuccesFully", ok: true });
  } catch (error) {
    res.status(401).send({ msg: "Bad Request 404", ok: false, err: error.message });
  }
});

//Delete specific user
userRouter.delete("/deleteuser/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "User deleted successfully." });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  userRouter,
};
