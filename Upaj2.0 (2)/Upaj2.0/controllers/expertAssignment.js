const expertSchema = require('../models/expertSchema');

const expertAssignment = async (season)=>
{
        const experts = await expertSchema.find({expertise:season.toLowerCase()});
        let min = 100;
        let min_ele;
        let ele_id;
        let min_;
        experts.forEach(element => {
            if(min>element.ticketsAssigned){
                min=element.ticketsAssigned;
                min_=element;
                ele_id = element._id;
            }
        });
        min = min+1;
        await expertSchema.findByIdAndUpdate(ele_id, {ticketsAssigned : min}, {new : true});

        return min_.expertname;
}
module.exports = expertAssignment