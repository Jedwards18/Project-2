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
//Takes in a search and stores it into db
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
};
//Front-end JavaScript//
$(document).ready(function(){
  // hideTableContainer();
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
//Variable that helps clear selects
const select = $("select");  
$(document).ready(function(){
  //Populates User Searches Table on page load  
    $.ajax({
      url:"/api/new/",
      method: "get"}).then(function(response) {
        console.log(response);
        for (var i = 0; i < 5; i++) {
          $("#searchesBody").append(`</tr><tr><td> ${response[i].project_name} </td>
          <td> ${response[i].category} </td>
          <td> ${response[i].country} </td>
          <td> ${response[i].min_goal} </td>
          <td> ${response[i].max_goal} </td>`);
        }
    });
    // On Submit Button Press
    $("#submit-button").on("click", function(event) {

      event.preventDefault();

      var projectName = $("#project-name").val();
      var category = $("#category").val();
      var country = $("#country").val();
      var minGoal = $("#min-goal").val();
      var maxGoal = $("#max-goal").val();
      //Won't submit post if missing information
      if(!category || !country || !minGoal || !maxGoal){
        console.log("No input");
        console.log(category+country+minGoal+maxGoal);
        return;
      };
      //Hide form on button click and show results
      $("#formContainer").hide(200);
      $("#resultsContainer").show(1000);

      $.ajax({
        url: "/api/"+country+"/"+category+"/?goal1="+minGoal+"&goal2="+maxGoal,
        method: "get"}).then(function(response) {
        console.log(response);
        //If no results the form will appear again.
        if (response.failurePercentage === 'null' || response.successPercentage === 'null') {
          console.log("No Results");

          $("#formContainer").show(1000);
          $("#resultsContainer").hide(200);

          $("form input").val("");
          select.prop('selectedIndex', 0); 
          select.formSelect();

          var noResults = '<span class="light-green-text text-accent-3">Unfortunately your search had no results</span>';
          M.toast({html: noResults});
        };
        // ####### Success/Fail Pie Chart ########
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
            $("#successBody").append(`</tr><tr><td> ${response.successfulResults[i].project_name} </td>
            <td> ${response.successfulResults[i].project_name} </td>
            <td> ${response.successfulResults[i].main_category} </td>
            <td> ${response.successfulResults[i].country} </td>
            <td> ${response.successfulResults[i].pledged} </td>
            <td> ${response.successfulResults[i].goal} </td>
            <td> ${response.successfulResults[i].backers} </td>`);
          }
        };
        
        const loopFailureResults = function() {
          for (var i = 0; i < 5; i++) {
            $("#failureBody").append(`</tr><tr><td> ${response.failureResults[i].project_name} </td>
            <td> ${response.failureResults[i].project_name} </td>
            <td> ${response.failureResults[i].main_category} </td>
            <td> ${response.failureResults[i].country} </td>
            <td> ${response.failureResults[i].pledged} </td>
            <td> ${response.failureResults[i].goal} </td>
            <td> ${response.failureResults[i].backers} </td>`);
          }
        };
        loopSuccessResults();
        loopFailureResults();

      });
      insertNewSearch();
    
  });
});
//Reset Materialize selects after being cleared
select.formSelect();


    
      
   