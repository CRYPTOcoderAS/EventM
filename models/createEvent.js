
// event.js
const axios = require('axios');
const moment = require('moment'); // Import moment library
const mongoose = require('mongoose');

// MongoDB connection
require('./db');


const EVENTBRITE_API_KEY = 'O4ZQBFVJISFCZCX2GUTE';
const ORGANIZATION_ID = '1673953721493';

// Event schema
const eventSchema = mongoose.Schema({
  name: String,
  description: String,
  start: Date,
  end: Date,
  currency: String,
  online_event: Boolean,
  listing_visibility: String,
});

const Event = mongoose.model('Event', eventSchema);

const createEvent = async (eventData) => {
  try {
    const response = await axios.post(
      `https://www.eventbriteapi.com/v3/organizations/${ORGANIZATION_ID}/events/`,
      eventData,
      {
        headers: {
          Authorization: `Bearer ${EVENTBRITE_API_KEY}`,
        },
      }
    );

    console.log('Event created successfully:');
    console.log(response.data);

    // Store the event data in the MongoDB database
    const newEvent = new Event({
      name: response.data.name.text,
      description: response.data.description.text,
      start: response.data.start.utc,
      end: response.data.end.utc,
      currency: response.data.currency,
      online_event: response.data.online_event,
      listing_visibility: response.data.listing_visibility,
    });

    await newEvent.save();

    return response.data;
  } catch (error) {
    console.error('Error creating the event:', error.message);
    return null;
  }
};

module.exports = createEvent;
