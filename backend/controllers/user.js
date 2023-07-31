const axios = require("axios");
const User = require("../models/userModel");
const Interest = require("../models/interestModel");
const bcrypt = require("bcryptjs");
const util = require("../utils/util");

let addUser = async (req, res) => {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const user = await User.create(data);
    res.status(201).json({ User: user, message: "User created successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
};

let login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        const token = util.generateToken(user._id);
        res.status(200).json({
          User: user,
          message: "User logged in successfully",
          Token: token,
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

let deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.user._id });
    res.status(200).json({ User: user, message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
};

let addInterest = async (req, res) => {
  try {
    const interest = await Interest.findOne({ _id: req.params.id });
    const result = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $addToSet: {
          interests: interest.interestName,
        },
      }
    );
    res
      .status(200)
      .json({ Interest: result, msg: "Interest updated successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
};

let getUserDetails = async (req, res) => {
  try {
    // console.log(req.user);
    const user = await User.findOne({ _id: req.user._id });
    res
      .status(200)
      .json({ User: user, message: "User details retrieved successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
};

let getAllEvents = async (req, res) => {
  try {
    const url = `https://www.eventbriteapi.com/v3/organizations/${process.env.ORGANIZATION_ID}/events/?token=${process.env.API_TOKEN}`;
    // console.log(process.env.ORGANIZATION_ID + " " + process.env.API_TOKEN);
    let response = await axios.get(url);
    res.status(200).json(response.data.events);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

let registerForEvents = async (req, res) => {
  try {
    let eventId = req.params.id;
    let { eventName } = req.body;
    let newEvent = {eventId, eventName};
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          events: newEvent
        }  
      }
    );
    res.status(200).json({ msg: "Event registered successfully" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};


let fetchRegisteredEvents = async (req, res) => {
  try {
    let response = await axios.get(
      `https://www.eventbriteapi.com/v3/organizations/${process.env.ORGANIZATION_ID}/events/?token=${process.env.API_TOKEN}`
    );
    let events = response.data.events.filter((e) =>
      req.user.events.includes(e.id)
    );
    res.status(200).send(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


let getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
   // console.log(users);
    res.status(200).json({message: "All users fetched successfully", users});
  } catch (e) {
    console.log(e.message);
    res.status(500).json({msg: "Can't fetch All users"});
  }
};


module.exports = {
  addUser,
  login,
  deleteUser,
  addInterest,
  getUserDetails,
  getAllEvents,
  getAllUsers,
  registerForEvents,
  fetchRegisteredEvents,
};