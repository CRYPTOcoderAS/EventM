const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      city: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      interests: [
        {
          type: String,
        },
      ],
      events: [
        {
          eventId: {type: String, },
          eventName: {type: String, },
        }
      ],
    },
    {
      timestamps: true,
    }
  );
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;