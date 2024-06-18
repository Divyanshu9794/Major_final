const ticketSchema = require('../models/farmerTicketSchema');

const allTicketsController = async (req, res)=>
{
    try {
        let path = req.originalUrl.substring(1,6);
        let tickets;
        if(path==="users"){
        const email = req.session.email;
            tickets = await ticketSchema.find({useremail:email});
        }
        else if(path==="admin"){
            tickets = await ticketSchema.find();
        }
        res.status(200).json(tickets);
    } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = allTicketsController