const expertSchema = require('../models/expertSchema')


const newExpertController = async (req, res) =>
{
    try {
        
        const {expertname, expertise, ticketsAssigned} = req.body;
        ;
        if (!expertname) {
            return res.status(400).send("Expertname is required");
          }
        if (!expertise) {
            return res.status(400).send("Expertise is required");
          }

       const newExpert = new expertSchema({expertname, expertise, ticketsAssigned});
       const savedExpert = await newExpert.save();
        
       if (savedExpert) {
        return res.status(200).redirect('http://localhost:5000/admin/');
      } else {
        return res.status(500).send("There was an error adding the Agent...!");
      }

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = newExpertController