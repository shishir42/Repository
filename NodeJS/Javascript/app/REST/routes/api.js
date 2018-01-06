const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of ninjas from database
router.get('/ninjas', function(req, res, next){
    //res.send({type:'GET'});

    Ninja.find({}).then(function(ninja){
      res.send(ninja);
    });

    // Ninja.geoNear(
    //     {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
    //     {maxDistance: 100000, spherical: true}
    // ).then(function(ninjas){
    //     res.send(ninjas);
    // }).catch(next);

});

// add a new ninja to database
router.post('/ninjas', function(req, res, next){
    //console.log(req.body);
    //var ninja = new Ninja(req.body);
    //ninja.save();

    //or
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);

    //res.send({type:'POST', data: req.body});
});

// update a ninjas in the database
router.put('/ninjas/:id', function(req, res, next){
    // Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(ninja){
    //   res.send(ninja);
    // });
    //res.send({type:'PUT'});

    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
      Ninja.findOne({_id: req.params.id}).then(function(ninja){
          res.send(ninja);
      });
    });
});

// delete a ninja from database
router.delete('/ninjas/:id', function(req, res, next){
    //console.log(req.params.id);
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
      res.send(ninja);
    });
    //res.send({type:'DELETE'});
});

module.exports = router;
