var express = require('express');
var Vignette = require('../model/vignette')
var mongoose = require('mongoose');

var router = express.Router();



/* GET home page. */


router.get('/getVignettes', function(req, res, next) {
  var searchQuery = {};

  if(req.query.name)
    searchQuery = { name: req.query.name };

  Vignette.find(searchQuery, function(err, vignettes){
    if (err) {
      console.log("ERROR");
      res.status(400);
      res.send();
    }
    console.log("returning all the vignettes.");
    res.send(vignettes);
  })
});

router.post('/insertNewVignette', function(req, res, next) {
  var newVignette = new Vignette(req.body);
  newVignette._id = mongoose.Types.ObjectId();

  newVignette.save(function(err) {
    if (err) {
      console.log("not saved!");
      res.status(400);
      res.send();
    }

    console.log("saved!");
    res.send({ id : newVignette._id });
  });
});

router.post('/deleteVignette', function(req, res, next) {
  Vignette.remove({id : req.body._id}, function(err) {
    if (err) {
      console.log("not removed!");
      res.status(400);
      res.send();
    }

    console.log("removed!");
    res.send({status: 'ok'});
  });
});

router.post('/updateVignette', function(req, res, next) {
  var vignette = new Vignette(req.body);
  console.log(res);
  Vignette.update({id : req.body._id}, vignette, function(err) {
    if (err) {
      console.log("not updated!");
      res.status(400);
      res.send();
    }

    console.log("updated!");
    res.send({status: 'ok'});
  });
});






module.exports = router;
