const ticketSchema = require("../models/farmerTicketSchema");
const expertSchema = require("../models/expertSchema");

const closeTicketController = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await ticketSchema.findById(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    const expertname = ticket.assignedExpert;
    let expert = await expertSchema.find({ expertname: expertname });
    expert = expert[0];
    expert.ticketsAssigned--;
    ticket.status = "closed";
    const updateExpert = await expert.save();
    const updateTicket = await ticket.save();

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = closeTicketController;
