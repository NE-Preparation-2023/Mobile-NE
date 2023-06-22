const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi')
const {NationalIdPattern} = require('./userModel');

const candidateSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
      },
      profilePicture: {
        type: String,
      },
      gender: {
        type: String,
        enum: ['male','female']
      },
      missionStatement: {
        type: String,
        required: true,
      },
      nationalId: {
        type: String,
        unique: true,
        required: true,
      },
    }, {
      timestamps: true
});

const candidateValidationSchema = Joi.object({
    names: Joi.string().required(),
    profilePicture: Joi.string(),
    gender: Joi.string().valid('male','female').required(),
    missionStatement: Joi.string().required(),
    nationalId: Joi.string().pattern(NationalIdPattern).length(16).required(),
})

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = {
    Candidate,
    candidateValidationSchema
}