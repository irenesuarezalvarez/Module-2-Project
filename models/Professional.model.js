const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professionalSchema = new Schema(
    {
      username: {
        type: String,
        trim: true,
        required: [true, 'Username is required.'],
        unique: true
      },
      email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        trim: true
      },
      passwordHash: {
          type: String,
          required: [true, 'Password is required.']
      }
    },
    {
      timestamps: true
    }
  );

module.exports = mongoose.model('Professional', professionalSchema);
