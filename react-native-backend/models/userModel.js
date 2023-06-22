const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    names: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    }
  });

  const userValidationSchema = Joi.object({
    names: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

//comparing password
userSchema.methods.comparePassword = async (password) => {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    userValidationSchema
}

module.exports.NationalIdPattern = /(?<!\d)\d{16}(?!\d)/;
module.exports.PhoneRegex = /(?<!\d)\d{10}(?!\d)/
