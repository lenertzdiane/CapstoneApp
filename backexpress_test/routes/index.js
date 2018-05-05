var express = require('express');
var Vignette = require('../model/vignette')
var Standalone = require('../model/standalone')
var Anchor = require('../model/anchor')
var mongoose = require('mongoose');

var router = express.Router();



/* GET home page. */


router.get('/getVignettes', function(req, res, next) {
  var searchQuery = {};

  if(req.query.name){
  searchQuery = { characters: req.query.name };
  console.log(searchQuery)
}

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
  console.log(newVignette._id)

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

  Vignette.remove({_id : req.body.id}, function(err) {
    if (err) {
      console.log("not removed!");
      res.status(400);
      res.send();
    }

    console.log("removed!");
    res.send({status: 'ok'});
  });
});


router.post('/updateVignette', function (req, res, next) {

  var id = req.body._id;
  delete req.body._id;
  res.send(req.body)

  Vignette.update({_id: id}, req.body, function (err) {

    // Do something after update here
  });

});
// router.post('/updateVignette', function(req, res, next) {
//   var vignette = new Vignette(req.body);
//   console.log(req.body)
//   console.log(vignette)
//   // console.log;
//   Vignette.update({id : req.body._id}, vignette, function(err) {
//     if (err) {
//       console.log("not updated!");
//       res.status(400);
//       res.send();
//     }
//
//     console.log("updated!");
//     // res.send({status: 'ok'});
//   });
// });


// STANDALONESSSSSSSSSSSSSSSSSSSSSSSSSSSS


router.get('/getStandalones', function(req, res, next) {
  var searchQuery = {};

  if(req.query.name){
  searchQuery = { characters: req.query.name };
  console.log(searchQuery)
}
  Standalone.find(searchQuery, function(err, standalones){
    if (err) {
      console.log("ERROR");
      res.status(400);
      res.send();
    }
    console.log("returning all the vignettes.");
    res.send(standalones);
  })
});

router.post('/insertNewStandalone', function(req, res, next) {
  var newStandalone = new Standalone(req.body);
  newStandalone._id = mongoose.Types.ObjectId();

  newStandalone.save(function(err) {
    if (err) {
      console.log("not saved!");
      res.status(400);
      res.send();
    }

    console.log("saved!");
    res.send({ id : newStandalone._id });
  });
});

router.post('/deleteStandalone', function(req, res, next) {
  Standalone.remove({id : req.body._id}, function(err) {
    if (err) {
      console.log("not removed!");
      res.status(400);
      res.send();
    }

    console.log("removed!");
    res.send({status: 'ok'});
  });
});

router.post('/updateStandalone', function(req, res, next) {
  var standalone = new Standalone(req.body);
  console.log(res);
  Standalone.update({id : req.body._id}, standalone, function(err) {
    if (err) {
      console.log("not updated!");
      res.status(400);
      res.send();
    }

    console.log("updated!");
    res.send({status: 'ok'});
  });
});

// ANCHORS
router.get('/getAnchors', function(req, res, next) {
  var searchQuery = {};
  if(req.query.name) {
    searchQuery = { name: req.query.name };
    console.log(searchQuery)
  }
  console.log(searchQuery)
  Anchor.find(searchQuery, function(err, anchors){
    if (err) {
      console.log("ERROR");
      res.status(400);
      res.send();
    }
    res.send(anchors);
  })
});

router.post('/insertNewAnchor', function(req, res, next) {
  var newAnchor = new Anchor(req.body);
  newAnchor._id = mongoose.Types.ObjectId();

  newAnchor.save(function(err) {
    if (err) {
      console.log("not saved!");
      res.status(400);
      res.send();
    }

    console.log("saved!");
    res.send({ id : newAnchor._id });
  });
});

router.post('/deleteAnchor', function(req, res, next) {
  Anchor.remove({_id : req.body.id}, function(err) {
    if (err) {
      console.log("not removed!");
      res.status(400);
      res.send();
    }

    console.log("removed!");
    res.send({status: 'ok'});
  });
});


router.post('/updateAnchor', function (req, res, next) {

  var id = req.body._id;
  delete req.body._id;
  res.send(req.body)

  Anchor.update({_id: id}, req.body, function (err) {

    // Do something after update here
  });

});


module.exports = router;
