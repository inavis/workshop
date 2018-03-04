var express = require('express');//express care of routes

var mov = require("../samplename/mov");

//mongodb connection
var mongoClient = require('mongodb').MongoClient;
var db;
mongoClient.connect("mongodb://127.0.0.1:27017",function(err,connection){
    db = connection.db("projector");//connect to the database created
});


var router = express.Router();//care of get,post

/* GET users listing. */
router.get('/', function(req, res) {
    var moviesCollection = db.collection("movies")
    moviesCollection.find().toArray(function(err,data){
      res.json(data);
  })
});

router.get('/avatar', function(req, res, next) {
    res.send('respond with a all movie name'+mov.name);
  });

  /*router.post('/addmovie', function(req, res, next) {
   console.log(req.body);
   res.json({
       isSuccess:true//like its added or JSON work is done
   });
  });*/

  router.post('/addmovie', function(req, res) {
    var ins = req.body;
    var moviesCollection = db.collection("movies")
    moviesCollection.insert(ins , function(err ,data ){
      if(!err){
          return res.json({isSuccess:true})
      }else{
          return res.json({isSuccess:false})
      }
    })
   });


  router.get('/:movieName', function(req, res, next) {// /:name---taken asa para and can be returned
      var n = req.params.movieName;
    //res.send('respond with one movie name'+n);
    var moviesCollection = db.collection("movies")
    moviesCollection.find({"name":n}).toArray(function(err,data){
      res.json(data);
  })
  });

module.exports = router;//exporting so that other js files can use this
