const mongoose = require("mongoose");

const farmerTicketSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    useremail: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    nitrogen: {
      type: Number,
      required: true,
    },
    phosphorous: {
      type: Number,
      required: true,
    },
    potassium: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    rainfall: {
      type: Number,
      required: true,
    },
    pH: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
    predictedCrop: {
      type: String,
      default: "rice",
    },
    assignedExpert: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("farmerTicket", farmerTicketSchema);
