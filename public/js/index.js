//Functions to hide and show containers//


const hideTableContainer = function() {
  $(".table-container").hide();
}; const showTableContainer = function() {
  $(".table-container").show();
}; const hideFormContainer = function() {
  $(".form-container").hide();
}; const showFormContainer = function() {
  $(".form-container").show();
};

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

  $("#edit-project-info-button").on("click", function() {
    showFormContainer();
    hideTableContainer();
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
      var country = $("#country").val();
      var category = $("#category").val();
      var min_goal = $("#min-goal").val();
      var max_goal = $("#max-goal").val();
      $.ajax({
        url: "/api/"+country+"/"+category+"?goal1="+min_goal+"&goal2="+max_goal,
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
      });

      // CLEAR FORM
      $("form input").val("");
      select.prop('selectedIndex', 0); //Sets the first option as selected
      select.formSelect();        //Update material select
      

 

  });
});

//Reset Materialize selects after being cleared
select.formSelect();

//Draw pie chart with success/ failure in results

    
      
   