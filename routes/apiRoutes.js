var db = require("../models");

// THESE ARE JUST SET UP FOR NOW, WILL FIX LATER ONCE WE KNOW WHERE WE'RE ROUTING DATA, PL 8/17

module.exports = function(app) {
  //not exactly sure what to do with this yet or if selecting all the data at once is necessary...
  app.get("/api", function(req, res) {
    db.startups.findAll({}).then(function(dbExamples) {
      console.log("findaAll " + dbExamples);
        res.json(dbExamples);    
    });
  });

//gets all data for category picked by user..
  app.get("/api/category/:main_category", function(req, res){
    db.startups.findAll({
      where: { main_category: req.params.main_category }
    }).then(function(dbExamples){
      res.json(dbExamples);
    })
  });

//gets all data for country picked by user..
  app.get("/api/country/:country", function(req, res){
    db.startups.findAll({
      where: { country: req.params.country }
    }).then(function(dbExamples){
      res.json(dbExamples);
    })
  });

// gets all data by country and category together
app.get("/api/:country/:main_category", function(req, res){
  db.startups.findAll({
    where: { 
      main_category: req.params.main_category,
      country: req.params.country
    }
  }).then(function(dbExamples){
    res.json(dbExamples);
  });
});

  // Our create route that needs to be finished once we figure out what we're posting..
  app.post("/api", function(req, res) {
    db.startups.create(req.body).then(function(dbExample) {
      console.log("create " + dbExamples);
      for (obj of dbExamples) {
        console.log(obj);
      }
      res.json(dbExample);
    });
  });

  };

