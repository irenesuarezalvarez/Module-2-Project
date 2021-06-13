const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professionalSchema = new Schema(
    {
      role: {
        type: String
      },
      username: {
        type: String,
        trim: true,
        required: [true, 'Username is required.'],
        unique: true
      },
      email: {
        type: String,
        required: [true, 'Email is required.'],
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        unique: true,
        lowercase: true,
        trim: true
      },
      passwordHash: {
          type: String,
          required: [true, 'Password is required.']
      },
      patients: [{ type: Schema.Types.ObjectId, ref: 'Patient'}] //NEW
    },
    {
      timestamps: true
    }
  );

module.exports = mongoose.model('Professional', professionalSchema);
