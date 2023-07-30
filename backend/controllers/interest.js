const Interest = require("../models/interestModel");

let addInterest = async (req, res) => {      
  try {
    const { interestName } = req.body;
    if (!interestName || !interestName.trim())
      res.status(400).json({ error: "Please enter interest name properly" });
    else {
      const interest = await Interest.create({interestName: interestName});
      console.log(interest);
      res.status(201).json({ message: "Interest added" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" }); 
  }
};

let getAllInterests = async (req, res) => {
  try {
    const interests = await Interest.find();
    res.status(200).json(interests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addInterest, getAllInterests };