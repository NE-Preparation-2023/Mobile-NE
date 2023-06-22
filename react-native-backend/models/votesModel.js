const mongoose = require('mongoose');
const Joi = require('joi')

const votesSchema = new mongoose.Schema({
    candidate: {
        type: String,
        required: true,
        ref: "candidate"
      },
      user: {
        type: String,
        required: true,
        ref: "user"
      }
    }, {
      timestamps: true
})

const votesValidationSchema = Joi.object({

})

const Votes = mongoose.model('Votes', votesSchema);

module.exports = {
    Votes,
    votesValidationSchema
}
