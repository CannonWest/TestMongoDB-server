var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});

/* GET User List page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('testColl');
    collection.find({},{},function(e,docs){
      res.render('userlist', {
        "userlist" : docs
      });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var Transponder_or_Plate = req.body.Transponder_or_Plate;
    var Plaza_Facility = req.body.Plaza_Facility;

    // Set our collection
    var collection = db.get('testColl');

    // Submit to the DB
    collection.insert({
        "Transponder_or_Plate" : Transponder_or_Plate,
        "Plaza_Facility" : Plaza_Facility
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });

});

/* GET New Query page. */
router.get('/newquery', function(req, res) {
    res.render('newquery', { title: 'Create New Query' });
});

/* GET Query List page. */
router.post('/querylist', function(req, res) {
    var db = req.db;
    var collection = db.get('testColl');
    // Get our form values. These rely on the "name" attributes
    var _id = req.body._id;
    var Transponder_or_Plate = req.body.Transponder_or_Plate;

    collection.find({"Transponder_or_Plate" : Transponder_or_Plate,
        "_id" : _id},{}, function(e,docs){
        res.render('querylist', {
            "querylist" : docs
        });
    });
});


module.exports = router;
