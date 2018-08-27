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
  //Populates User Searches Table on page load  
    $.ajax({
      url:"/api/new/",
      method: "get"}).then(function(response) {
        console.log(response);
        for (var i = 0; i < 5; i++) {
          $("#searchesBody").append("<tr></tr>");
          $("#searchesBody").append("<td>" + response[i].project_name + "</td>");
          $("#searchesBody").append("<td>" + response[i].category + "</td>");
          $("#searchesBody").append("<td>" + response[i].country + "</td>");
          $("#searchesBody").append("<td>" + response[i].min_goal + "</td>");
          $("#searchesBody").append("<td>" + response[i].max_goal + "</td>");
          console.log("Name: " + response[i].project_name);
        }
    });
    // On Submit Button Press
    $("#submit-button").on("click", function(event) {
      event.preventDefault();

      //Hide form on button click and show results
      $("#formContainer").hide(200);
      $("#resultsContainer").show(1000);
      
      var projectName = $("#project-name").val();
      var category = $("#category").val();
      var country = $("#country").val();
      var minGoal = $("#min-goal").val();
      var maxGoal = $("#max-goal").val();

      $.ajax({
        url: "/api/"+country+"/"+category+"/?goal1="+minGoal+"&goal2="+maxGoal,
        method: "get"}).then(function(response) {
        console.log(response);
        // ####### Success/Fail Pie Chart ########
        
          $(function () {
            $('#pieChart').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: "Success Rate of your Selection"
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Success',
                colorByPoint: true,
                data: [{
                    name: 'Success',
                    y: response.successPercentage
                }, {
                    name: 'Failure',
                    y: response.failurePercentage
                }]
            }]
          
          });
          });     
        
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

//######### CHARTS #############
$(function () {
  $('#chart1').highcharts({
  colorAxis: {
      minColor: "#f41400",
      maxColor: "#006df4"
  },
  series: [{
      type: 'treemap',
      layoutAlgorithm: 'squarified',
      data: [{
          name: 'Publishing',
          value: 10,
          colorValue: 29
      }, {
          name: 'Film & Video',
          value: 17,
          colorValue: 36
      }, {
          name: 'Music',
          value: 14,
          colorValue: 47
      }, {
          name: 'Food',
          value: 6,
          colorValue: 27
      }, {
          name: 'Design',
          value: 8,
          colorValue: 34
      }, {
          name: 'Crafts',
          value: 2,
          colorValue: 24
      }, {
          name: 'Games',
          value: 10,
          colorValue: 36
      }, {
          name: 'Comics',
          value: 3,
          colorValue: 55
      }, {
          name: 'Fashion',
          value: 6,
          colorValue: 24
      }, {
          name: 'Theater',
          value: 3,
          colorValue: 61
      }, {
          name: 'Art',
          value: 8,
          colorValue: 41
      }, {
          name: 'Photography',
          value: 3,
          colorValue: 31
      }, {
          name: 'Technology',
          value: 8,
          colorValue: 20
      }, {
          name: 'Dance',
          value: 1,
          colorValue: 60
      }, {
          name: 'Journalism',
          value: 1,
          colorValue: 18
      },
    ]
  }],
  title: {
      text: 'Size and Success of Each Category'
  },
  legend: {
      enabled: true,
      title: {
        text: 'Percent Successful<br/><span style="font-size: 9px; color: #666; font-weight: normal"></span>',
        style: {
            fontStyle: 'italic'
        }
  }
}
  
  
});
});
