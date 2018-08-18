var db = require("../models");

// THESE ARE JUST SET UP FOR NOW, WILL FIX LATER ONCE WE KNOW WHERE WE'RE ROUTING DATA, PL 8/17

module.exports = function(app) {
  // Get all examples
  app.get("/api", function(req, res) {
    db.startups.findAll({}).then(function(dbExamples) {
      console.log("findaAll " + dbExamples);
      for (let obj of dbExamples) {
        console.log(obj.id);
        
      }
      res.json(dbExamples);
    });
  });

  app.get("/api/category/:main_category", function(req, res){
    db.startups.findAll({
      where: { main_category: req.params.main_category }
    }).then(function(dbExamples){
      res.json(dbExamples);
    })
  });

  app.get("/api/country/:country", function(req, res){
    db.startups.findAll({
      where: { country: req.params.country }
    }).then(function(dbExamples){
      res.json(dbExamples);
    })
  });

  // Create a new example
  app.post("/api/startups", function(req, res) {
    db.startups.create(req.body).then(function(dbExample) {
      console.log("create " + dbExamples);
      for (obj of dbExamples) {
        console.log(obj);
      }
      res.json(dbExample);
    });
  });

  // Delete an example by id
  };

