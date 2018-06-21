console.log("page loaded");
// var recipedata=firebase.database();

var recipeResults;
var wineResults;

$(document).ready(function(){

    
    $(".dropdown-item").on("click", function(event){
        event.preventDefault();
        console.log("We got clicked");
        var meatChoice=$(this).text();
        
        console.log(meatChoice);
        
        // var pickedRecipe={
            // name: recipeName,
            
        // }
        
        // recipedata.ref().push(pickedRecipe);
        
        // $("#meatChoiceInput").val("");
        
        var queryURL = " http://food2fork.com/api/search?key=5efd6700d05dd5b856e7fc18388f7e35&q="+ meatChoice;
        
        $.ajax({
            method: 'GET',
            url: 'https://cors-anywhere.herokuapp.com/' + 'food2fork.com/api/search?key=5efd6700d05dd5b856e7fc18388f7e35&q=chicken'
          }).then(function(data) {
            console.log(data);
            recipeResults = data;
            var showRecipes = function() {
              for (var i = 0; i <= recipeResults[9]; i++) {
                var recipeResult = recipeResults[i];
                $(".card-img-top").attr("src=" + recipeResult.recipes.image_url);
                $(".card-title").text(recipeResult.recipes.title);
                $(".card-text").text("Source: " + recipeResult.recipes.publisher + "<br> <br> <a src='" + recipeResult.recipes.f2f_url + "'>Read it here!</a>");
              }
            }
            showRecipes();  
          });

        
        
        $("#wineButton").on("click", function(event){
            event.preventDefault();
            console.log("We got clicked");
            var winePair=$(this).text();
            
            console.log(winePair);
           
            $.ajax({
                method: 'GET',
                url: 'https://cors-anywhere.herokuapp.com/' + 'http://api.snooth.com/wines/?akey=r5l4astuvugywu5f0f80llsepjff64yp98w008mhhn7jd639&ip=66.28.234.115&q=wine&xp=5'
              }).then(function(data) {
                console.log(data);
              });
            })
        
    })

});

//Notes for moving forward:  

//Should the wine button be in the same function with the recipe button?  It might be better to have it in its own click event, since it happens after the recipes are returned and dsiplayed, and the user chooses a recipe.

//Since the var queryUrl was not used (line 26), can it be deleted? 

//Lines 33-42 are meant to populate the cards in the deck with image, title, and link to page.  It's not working. Either the format of the API response is the problem (it looks odd), or my JQuery is bad.