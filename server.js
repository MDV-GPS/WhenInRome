'use strict';
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Models = require('./database/models');

app.use(express.static(path.join(__dirname, './node_modules/')));
app.use(express.static(path.join(__dirname, './client/')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ***DATABASE SETUP***

// Using a Hosted MongoDB @ https://mlab.com/ account.
// You can use login info below to access mlab.com portal to add additional user accounts.
mongoose.connect('mongodb://nmarentes:beekeepers17@ds049211.mlab.com:49211/nativeapp');
//mongoose.connect('mongodb://dhanimay:http99@ds023932.mlab.com:23932/wheninrome');


const db = mongoose.connection.once('open', () => {
    console.log('Connected to mongodb with mongoose');

});

db.on('error', console.error.bind(console, 'connection error: '));

// ***END OF DATABASE SETUP ***

// GET request to /itins serves up ALL itins in DB. You can also see at http://localhost:3000/itins
app.get('/itins', function(req, res) {
  Models.Itinerary.find({}, function(err, itins){res.send(itins)});
});

app.post('/create', function(req, res) {
    Models.Itinerary.create(req.body, function(err, created) {
      if(err) return console.error(err);
      res.send(req.body);
    });
});

app.post('/user/create', (req, res) =>{
  Models.User.findOne({username: req.body.username}, (err, user) =>{
    if(err) return console.error(err);
    if(user){
      res.json('User exists.');
      return;
    }


    Models.User.create(req.body, (err, created) =>{
      if(err) return console.error(err);
      if(created){
        res.json(created);
        return;
      }
      res.json("Account could not be created.");
    });
  });
});

app.post('/user/valid', (req, res) =>{
  Models.User.findOne({username: req.body.username}, (err, user) =>{
    if(err) return console.error(err);
    if(!user) return res.json('Something is entered incorrectly!!!!!!!');
    if(user.password === req.body.password){
      res.json(true);
      return;
    }
    res.json('Something is entered incorrectly!!!!!!!');
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
