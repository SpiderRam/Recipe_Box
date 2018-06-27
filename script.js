//console.log("page loaded");

var recipeResults;
var wineResults;
var currentChoice = {};
var wineChoice;
var recipeChoice;

$(document).ready(function(){
  $(".dropdown-item").on("click", function(event){
    event.preventDefault();
    $("#recipes").empty();
    $("#wines").empty();
    console.log("We got clicked");
    var meatChoice=$(this).text();
    console.log(meatChoice);
    var wineColor = "";
    
    if (meatChoice == "Pork") {
      var wineColor = "amber";
    }
    if(meatChoice=="Tofu"){
      var wineColor = "clear";
    }
    if (meatChoice == "Beef"){
      var wineColor = "red";
    }
    if(meatChoice == "Chicken"){
      var wineColor = "white"; 
    }
    if(meatChoice == "Fish"){
      var wineColor = "rose"; 
    }

    $.ajax({
      method: 'GET',
      url: 'https://cors-anywhere.herokuapp.com/' + 'http://api.snooth.com/wines/?akey=r5l4astuvugywu5f0f80llsepjff64yp98w008mhhn7jd639&ip=66.28.234.115&n=30&color=' + wineColor
    }).then(function(data) {
      var cleanData = JSON.parse(data);
      console.log("wineData",cleanData);
      
      for(var i= 0; i<cleanData.wines.length; i++){
        console.log("wines choice", cleanData.wines[i]);
        var wineTitle = $("<a>");
        wineTitle.text(cleanData.wines[i].name);
        wineTitle.attr("href", cleanData.wines[i].link);
        wineTitle.attr("target", "_blank");
        var wineImage = $("<img>");
        wineImage.attr("src",cleanData.wines[i].image);
        wineChoice = $("<button>Choose Me!</button>");    
        wineChoice.attr("class", "wine-choice");
        wineChoice.attr("id", "wine-choice-button");
        wineChoice.attr("data-wine-url", cleanData.wines[i].link);
        wineChoice.attr("data-wine-name", cleanData.wines[i].name);
        wineChoice.attr("class", "wine-choice");
        console.log("wineChoice",wineChoice);
        $("#wines").append(wineTitle);
        $("#wines").append(wineImage);
        $("#wines").append(wineChoice);        
      }
      
      $.ajax({
        method: 'GET',
        url: 'https://cors-anywhere.herokuapp.com/' + 'food2fork.com/api/search?key=5efd6700d05dd5b856e7fc18388f7e35&q='+ meatChoice
      }).then(function(data) {
        var cleanData = JSON.parse(data);
        console.log("recipesdata",cleanData);
        
        for(var i=0; i < cleanData.recipes.length; i++ ){
          console.log("Individual Recipe",cleanData.recipes[i]);
          var recipeTitle = $("<a>");
          var myImage = $("<img>");         
          myImage.attr("src",cleanData.recipes[i].image_url);
          recipeTitle.attr("src",cleanData.recipes[i].f2f_url);         
          recipeTitle.text(cleanData.recipes[i].title);
          recipeTitle.attr("href", cleanData.recipes[i].f2f_url);
          recipeTitle.attr("target", "_blank");
          recipeChoice = $("<button>Choose Me!</button>");
          recipeChoice.attr("id", "recipe-choice-button");
          recipeChoice.attr("data-recipe-url", cleanData.recipes[i].f2f_url);
          recipeChoice.attr("data-recipe-name", cleanData.recipes[i].title);
          recipeChoice.attr("class", "recipe-choice");
          $("#recipes").append(recipeTitle);
          $("#recipes").append(myImage);
          $("#recipes").append(recipeChoice);
        }
      });

    });
    
    recipeData.ref().on("child_added",function(snapshot){
      var name = snapshot.val().recipeName;
      var recipeLink = snapshot.val().recipeUrl;
        var wine = snapshot.val().wineName;
        var wineLink = snapshot.val().wineUrl;
        console.log("this is from db",snapshot.val());
        $("#recipe-box > tBody").append("<tr><td>"+ name+ "</td><td>" + recipeLink + "</td><td>" + wine + "</td><td>" + wineLink + "</td><tr>");
      });
    });
    
    $("body").on("click", ".recipe-choice", function() {
      var buttonAsJQueryObject = $(this);
      currentChoice.recipeName = buttonAsJQueryObject.attr("data-recipe-name");
      currentChoice.recipeUrl = buttonAsJQueryObject.attr("data-recipe-url");
      console.log(currentChoice);
    });
    
    $("body").on("click", ".wine-choice", function() {
      var buttonAsJQueryObject = $(this);
      currentChoice.wineName = buttonAsJQueryObject.attr("data-wine-name");
      currentChoice.wineUrl = buttonAsJQueryObject.attr("data-wine-url");
      console.log(currentChoice);
    });
  
    $("#saveChoice").on("click", function(){
      console.log("this is our current choice", currentChoice);
      recipeData.ref().push(currentChoice);
    });
  
    var config = {
    apiKey: "AIzaSyAMVMiPlgICX_CJxs5ivIrtv7Z3yrsDyWI",
    authDomain: "recipebox-9b7a6.firebaseapp.com",
    databaseURL: "https://recipebox-9b7a6.firebaseio.com",
    projectId: "recipebox-9b7a6",
    storageBucket: "recipebox-9b7a6.appspot.com",
    messagingSenderId: "315061764504"
    };
    
    firebase.initializeApp(config);
    var recipeData=firebase.database();
  });

