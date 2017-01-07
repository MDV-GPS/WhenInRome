'use strict';
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  zip: String,
  interest: String
});

const itinerarySchema = new mongoose.Schema({
    title: String,
    author: String,
    authorLocation: String,
    authorZip: String,
    stop1placeName: String,
    stop1location: String,
    stop1description: String,
    stop2placeName: String,
    stop2location: String,
    stop2description: String,
    stop3placeName: String,
    stop3location: String,
    stop3description: String,
    stop4placeName: String,
    stop4location: String,
    stop4description: String
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
let User = mongoose.model('User', userSchema);

module.exports = {Itinerary, User};
