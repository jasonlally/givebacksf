var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    mongoose = require('mongoose');

var app = express();

// database

mongoose.connect('mongodb://localhost/givebacksf');

// config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

var Schema = mongoose.Schema; //Schema.ObjectId

// Schemas

var Donation = new Schema({
  organization: { type: String, required: true },
  amount: { type: Number, required: true, min: 0, max: 1000 },
  given: { type: Date, default: Date.now }
});

var DonationModel = mongoose.model('Donation', Donation);


// REST api

app.get('/api', function (req, res) {
  res.send('API is running');
});

// POST to CREATE
// add donation
app.post('/api/donations', function (req, res) {
  var donation;
  console.log("POST: ");
  console.log(req.body);
  donation = new DonationModel({
    organization: req.body.organization,
    amount: req.body.amount
  });
  donation.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(donation);
});

// PUT to UPDATE

// GET to READ

// List donations
app.get('/api/donations', function (req, res) {
  return DonationModel.find(function (err, donations) {
    if (!err) {
      return res.send(donations);
    } else {
      return console.log(err);
    }
  });
});

// Donations by organization
app.get('/api/donations/:id', function (req, res) {
  return DonationModel.findById(req.params.id, function (err, donation) {
    if (!err) {
      return res.send(donation);
    } else {
      return console.log(err);
    }
  });
});

// DELETE to DESTROY

// Bulk destroy all donations
/*
app.delete('/api/donations', function (req, res) {
  DonationModel.remove(function (err) {
    if (!err) {
      console.log("removed");
      return res.send('');
    } else {
      console.log(err);
    }
  });
});*/

// remove a single donation
app.delete('/api/donations/:id', function (req, res) {
  return DonationModel.findById(req.params.id, function (err, product) {
    return product.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});

// launch server

app.listen(3030);