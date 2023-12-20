const express = require("express");
const memberRouter = express.Router();
const MEMBERDETAIL = require("../models/memberDetailsSchema");

// post user data
memberRouter.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, age, mobile, work, add, desc, admin_id } = req.body;

  if (
    !name ||
    !email ||
    !age ||
    !mobile ||
    !work ||
    !add ||
    !desc ||
    !admin_id
  ) {
    res.status(422).json("please... fill the data");
  }

  try {
    const preMember = await MEMBERDETAIL.findOne({ email: email });
    console.log(preMember);

    if (preMember) {
      res.status(422).json("this  user  is already present");
    } else {
      const addMember = new MEMBERDETAIL({
        name,
        email,
        age,
        mobile,
        work,
        add,
        desc,
        admin_id,
      });

      await addMember.save();
      res.status(201).json(addMember);
      console.log(addMember);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

//get userdata
memberRouter.get("/getdata/:admin_id", async (req, res) => {
  try {
    const { admin_id } = req.params;
    const memberData = await MEMBERDETAIL.find({ admin_id });
    res.status(201).json(memberData);
    console.log(memberData);
  } catch (error) {
    res.status(422).json(error);
  }
});

// get individual user
memberRouter.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const memberindividual = await MEMBERDETAIL.findById({ _id: id });
    console.log(memberindividual);
    res.status(201).json(memberindividual);
  } catch (error) {
    res.status(422).jsom(error);
  }
});

// update  user data
memberRouter.put("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedMember = await MEMBERDETAIL.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMember) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(updatedMember);
    res.status(201).json(updatedMember);
  } catch (error) {
    res.status(422).json(error);
  }
});

//delete user
memberRouter.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteMember = await MEMBERDETAIL.findByIdAndDelete({ _id: id });
    if (!deleteMember) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(deleteMember);
    res.status(201).json(deleteMember);
  } catch (error) {
    res.status(422).json(error);
  }
});

// search API
memberRouter.get("/search", async (req, res) => {
  try {
    const text = req.query.text;
    const result = await MEMBERDETAIL.find({
      name: { $regex: text, $options: "i" },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = memberRouter;
