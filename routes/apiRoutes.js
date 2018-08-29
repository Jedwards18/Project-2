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
  //Gets information on search and returns Kickstarters and Success/Fail percentage
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
      //No results actions
        if (isNaN(failurePercentage) || isNaN(successPercentage)) {
          console.log("No Results");
          res.json({
            successPercentage: 'null',
            failurePercentage: 'null',
          });
        } else {
      res.json({ 
        successfulResults: successfulResults,
        successPercentage: successPercentage,
        failureResults: failureResults,
        failurePercentage: failurePercentage 
      });
    };
    });
      
  });
  //Saves search results so they can be used in Recent Searches
  app.post("/api/new", function(req, res) {
    db.searches.create({ 
        project_name: req.body.project_name,
        category: req.body.category,
        country: req.body.country,
        min_goal: req.body.min_goal,
        max_goal: req.body.max_goal
      }).then(function(dbSearches) {
        res.json(dbSearches)
      });
  })
  //Orders searches in descending order to be used on table.
  app.get("/api/new", function(req, res) {
    db.searches.findAll({order: [['id', 'desc']]}).then(function(returnedResults) {
      const returnedValues = returnedResults.map(x => x.dataValues);
      console.log(returnedValues)
      res.json(returnedValues);
    });
  });
};