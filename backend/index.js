const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const interestRoute = require('./routes/interest');
const sgMail = require('@sendgrid/mail');

require('dotenv').config();

// Enable CORS for all routes
app.use(cors());

// Use middleware
app.use(express.json());
app.use(morgan());
app.use(express.urlencoded({ extended: true }));

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


app.post('/api/user/send-registration-email', (req, res) => {
  const { userEmail, eventId } = req.body;
  if (!userEmail || !eventId) {
    return res.status(400).json({ message: 'User email or event ID not provided in the request body' });
  }

  const msg = {
    to: userEmail,
    from: 'akshat0133@gmail.com', 
    subject: 'Registration Confirmation',
    text: 'Thank you for registering for our event! We look forward to seeing you there.',
    html: '<strong>Thank you for registering for our event! We look forward to seeing you there.</strong>',
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      res.json({ message: 'Email sent successfully' });
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    });
});


const port = process.env.PORT || 8000;

app.use('/api/user', userRoute);
app.use('/api/interest', interestRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });