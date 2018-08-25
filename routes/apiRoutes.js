var db = require("../models");

// THESE ARE JUST SET UP FOR NOW, WILL FIX LATER ONCE WE KNOW WHERE WE'RE ROUTING DATA, PL 8/17

module.exports = function(app) {
  //not exactly sure what to do with this yet or if selecting all the data at once is necessary...
  app.get("/", function(req, res) {
    db.startups.findAll({}).then(function(dbResults) {
      res.render('index', { dbResults });
    });
  });

//gets all data for category picked by user..
  app.get("/category/:main_category", function(req, res){
    db.startups.findAll({
      where: { main_category: req.params.main_category }
    }).then(function(categoryResults){
      res.render('index', { categoryResults });
    })
  });

//gets all data for country picked by user..
  app.get("/country/:country", function(req, res){
    db.startups.findAll({
      where: { country: req.params.country }
    }).then(function(countryResults){
      res.render('index', { countryResults });
    })
  });

// gets back JSON data for both a country and a category
  app.get("/:country/:main_category/", function(req, res){
    db.startups.findAll({
      where: { 
        main_category: req.params.main_category,
        country: req.params.country,
        goal: {
          [db.Sequelize.Op.between]: [req.query.goal1, req.query.goal2]
        },
      }
    }).then(function(returnedData){
      const returnedValues = returnedData.map(x => x.dataValues);
      console.log(returnedValues);
      var resultsNumber = returnedValues.length;
      console.log(resultsNumber);


      var successfulResults = returnedValues.filter(function(obj) {
        if(obj.state === 'successful') {
          return true
        } 
      });
      console.log(successfulResults);
      var successfulTotal = successfulResults.length;
      console.log(successfulTotal);
      var successPercentage = Math.round(successfulTotal/resultsNumber * 100);
      console.log("Success Percentage: " + successPercentage);

      var failureResults = returnedValues.filter(function(obj) {
        if(obj.state === 'failed') {
          return true
        }
      });
      console.log(failureResults);
      var failureTotal = failureResults.length;
      console.log(failureTotal);
      var failurePercentage = Math.round(failureTotal/resultsNumber * 100);
      console.log("Failure Percentage: " + failurePercentage);
      res.render('index', { 
        successfulResults: successfulResults,
        successPercentage: successPercentage,
        failureResults: failureResults,
        failurePercentage: failurePercentage 
      });
    });
  });

  // Our create route that needs to be finished once we figure out what we're posting..
  app.post("/startups", function(req, res) {
    db.startups.create(req.body).then(function(dbExample) {
      res.redirect("/");
    });
  });

  app.get("/api/:country/:main_category", function(req, res) {
    db.startups.findAll({
      where: { 
        main_category: req.params.main_category,
        country: req.params.country,
        goal: {
          [db.Sequelize.Op.between]: [req.query.goal1, req.query.goal2]
        },
      }
    }).then(function(returnedData){
      const returnedValues = returnedData.map(x => x.dataValues);
      var resultsNumber = returnedValues.length;

      var successfulResults = returnedValues.filter(function(obj) {
        if(obj.state === 'successful') {
          return true
        } 
      });
      var successfulTotal = successfulResults.length;
      var successPercentage = Math.round(successfulTotal/resultsNumber * 100);

      var failureResults = returnedValues.filter(function(obj) {
        if(obj.state === 'failed') {
          return true
        }
      });
      var failureTotal = failureResults.length;
      var failurePercentage = Math.round(failureTotal/resultsNumber * 100);
      console.log("Failure Percentage: " + failurePercentage);
      console.log("Success Percentage: " + successPercentage);
      res.json({ 
        successfulResults: successfulResults,
        successPercentage: successPercentage,
        failureResults: failureResults,
        failurePercentage: failurePercentage 
      });
    });
      
  });
  };

