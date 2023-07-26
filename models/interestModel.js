const mongoose = require('mongoose')


const interestSchema = mongoose.Schema(
    {
        interestName: {
            type: String,
            required: true
        }
    }
) 

const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;