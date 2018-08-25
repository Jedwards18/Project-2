// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

// //--------------------------------------//

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
  hideTableContainer();

  $("#resultsContainer").hide();
  

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

    
      // google.charts.load('current', {'packages':['corechart']});
      // google.charts.setOnLoadCallback(drawChart);

      // function drawChart() {

      //   var data = google.visualization.arrayToDataTable([
      //     ['Task', 'Hours per Day'],
      //     ['Success', response.successPercentage],  
      //     ['Failure',  response.failurePercentage],
      //   ]);

      //   var options = {
      //     title: 'Success/ Failure'
      //   };

      //   var chart = new google.visualization.PieChart(document.getElementById('piechart'));

      //   chart.draw(data, options);
      // }
   