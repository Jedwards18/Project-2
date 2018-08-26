//Functions to hide and show containers//


const hideTableContainer = function() {
  $(".table-container").hide();
}; const showTableContainer = function() {
  $(".table-container").show();
}; const hideFormContainer = function() {
  $("#formContainer").hide();
}; const showFormContainer = function() {
  $("#formContainer").show();
}; const hideResultsContainer = function() {
  $("#resultsContainer").hide();
}; const showResultsContainer = function() {
  $("#resultsContainer")
}

function insertNewSearch(event) {
  //event.preventDefault();
  var search = {
    project_name: $("#project-name").val().trim(),
    category: $("#category").val().trim(),
    country: $("#country").val().trim(),
    min_goal: $("#min-goal").val().trim(),
    max_goal: $("#max-goal").val().trim()
  };

  $.ajax({
    url: "/api/new",
    dataType: "json",
    type: "post",
    data: search,
  });
  console.log(search);
}

//Front-end JavaScript//
$(document).ready(function(){
  // hideTableContainer();
  //   //######################
  $("#resultsContainer").show();

  // $("#resultsContainer").hide();
  

  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  });

  $("#display-results-data").on("click", function() {
    hideFormContainer();
    showTableContainer();
  });

  $("#edit-new-project-button").on("click", function() {
    showFormContainer();
    hideTableContainer();
    hideResultsContainer();
  });

  $("#clear-form-button").on("click", function() {
    hideTableContainer();
    showFormContainer();
    $("#new-project-form")[0].reset();
  });
});

//inits materialize features
// Makes Collapsible werk werk werk werk werk
const elem = document.querySelector('.collapsible.expandable');
const instance = M.Collapsible.init(elem, {
  accordion: false
});

$(document).ready(function(){
  $('.tabs').tabs();  
});

$(document).ready(function(){
  $('.parallax').parallax();
});

$(document).ready(function(){
  $('.tooltipped').tooltip();
});

$(document).ready(function(){
  $('select').formSelect();
});

$(document).ready(function(){
  $('.collapsible').collapsible();
});




const select = $("select");  //Variable that helps clear selects
$(document).ready(function(){
    $("#submit-button").on("click", function(event) {
      event.preventDefault();

      //Hide form on button click and show results
      $("#formContainer").hide(200);
      $("#resultsContainer").show(1000);
      //Make inputed data into object
      // const newUser = {
      //   name: $("#project-name").val().trim(),
      //   category: $("#category").val(),
      //   country: $("#country").val(),
      //   min_goal: $("#min-goal").val().trim(),
      //   max_goal: $("#max-goal").val().trim()
      // };
      // console.log(newUser);
      var projectName = $("#project-name").val();
      var category = $("#category").val();
      var country = $("#country").val();
      var minGoal = $("#min-goal").val();
      var maxGoal = $("#max-goal").val();

      $.ajax({
        url: "/api/"+country+"/"+category+"/?goal1="+minGoal+"&goal2="+maxGoal,
        method: "get"}).then(function(response) {
        console.log(response);
       
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Success', response.successPercentage],  
            ['Failure',  response.failurePercentage],
          ]);

          var options = {
            title: 'Success/ Failure'
          };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
        
        $("#successPercentage").text(response.successPercentage);
        $("#failurePercentage").text(response.failurePercentage);
        const loopSuccessResults = function() {
          for (var i = 0; i < 5; i++) {
            $("#successBody").append("<tr></tr>");
            $("#successBody").append("<td>" + response.successfulResults[i].project_name + "</td>");
            $("#successBody").append("<td>" + response.successfulResults[i].main_category + "</td>");
            $("#successBody").append("<td>" + response.successfulResults[i].country + "</td>");
            $("#successBody").append("<td>" + response.successfulResults[i].pledged + "</td>");
            $("#successBody").append("<td>" + response.successfulResults[i].goal + "</td>");
            $("#successBody").append("<td>" + response.successfulResults[i].backers + "</td>");
          }
        };
        
        const loopFailureResults = function() {
          for (var i = 0; i < 5; i++) {
            $("#failureBody").append("<tr></tr>");
            $("#failureBody").append("<td>" + response.failureResults[i].project_name + "</td>");
            $("#failureBody").append("<td>" + response.failureResults[i].main_category + "</td>");
            $("#failureBody").append("<td>" + response.failureResults[i].country + "</td>");
            $("#failureBody").append("<td>" + response.failureResults[i].pledged + "</td>");
            $("#failureBody").append("<td>" + response.failureResults[i].goal + "</td>");
            $("#failureBody").append("<td>" + response.failureResults[i].backers + "</td>");
          }
        };
        loopSuccessResults();
        loopFailureResults();

      });
      insertNewSearch();
      
    // $("#recent-searches-button").on("click", function() {
    //   event.preventDefault();
    //   $("#formContainer").hide(200);
      
    //   var projectName = $("#project-name").val();
    //   var category = $("#category").val();
    //   var country = $("#country").val();
    //   var minGoal = $("#min-goal").val();
    //   var maxGoal = $("#max-goal").val();

    //   $.ajax({
    //     url: "/api/"+projectName+"/"+country+"/"+category,
    //     method: "get"}).then(function(response) {
    //       console.log(response);
    //   })
    // })
  });
});

//Reset Materialize selects after being cleared
select.formSelect();

//Draw pie chart with success/ failure in results

    
      
   