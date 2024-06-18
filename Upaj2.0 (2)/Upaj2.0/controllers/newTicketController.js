const ticketSchema = require("../models/farmerTicketSchema");
const expertAssignment = require("./expertAssignment");

const newTicketController = async (req, res) => {
  try {
    const {
      username,
      useremail,
      region,
      nitrogen,
      phosphorous,
      potassium,
      temperature,
      humidity,
      rainfall,
      pH,
      area,
      season,
    } = req.body;
    const assignedExpert = await expertAssignment(season);
    if (!username) {
      return res.status(400).send("Username is required");
    }
    if (!useremail) {
      return res.status(400).send("Email is required");
    }
    const predictedCrop = req.body.predictedCrop;

    const newTIcket = new ticketSchema({
      username,
      useremail,
      region,
      nitrogen,
      phosphorous,
      potassium,
      temperature,
      humidity,
      rainfall,
      pH,
      area,
      season,
      predictedCrop,
      assignedExpert,
    });
    const savedTicket = await newTIcket.save();

    if (savedTicket) {
      return res.status(200).redirect("http://localhost:5000/users/");
    } else {
      return res.status(500).send("There was an error creating the Ticket...!");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = newTicketController;
