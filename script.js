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
        // set wine color based on meat choice
        if (meatChoice == "Pork") {
          var wineColor = "amber";
        }
        if(meatChoice=="Tofu"){
          var WineColor="clear";
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
          $.ajax({
            method: 'GET',
            url: 'https://cors-anywhere.herokuapp.com/' + 'food2fork.com/api/search?key=5efd6700d05dd5b856e7fc18388f7e35&q='+ meatChoice
          }).then(function(data) {
            $("#mainDiv").empty();
            var cleanData = JSON.parse(data);
            console.log("recipesdata",cleanData);
            for(var i=0; i < cleanData.recipes.length; i++ ){
              console.log("Individual Recipe",cleanData.recipes[i]);
              var h1 = $("<h1>")
              var myImage = $("<img>")
              myImage.attr("src",cleanData.recipes[i].image_url)
              // myImage.attr("src",cleanData.recipes[i].f2f_url)
              myImage.attr("class","recipePictures")
              h1.text(cleanData.recipes[i].title)
              h1.attr("src",cleanData.recipes[i].f2f_url)
              $("#recipes").append(h1);
              $("#recipes").append(myImage);
            }
          });
          
        });
        
        // $.ajax({
        //     method: 'GET',
        //     url: 'https://cors-anywhere.herokuapp.com/' + 'food2fork.com/api/search?key=5efd6700d05dd5b856e7fc18388f7e35&q='+ meatChoice
        //   }).then(function(data) {
        //     $("#mainDiv").empty();
        //     var cleanData = JSON.parse(data);
        //     console.log("recipesdata",cleanData);
        //     for(var i=0; i < cleanData.recipes.length; i++ ){
        //       console.log("singledude",cleanData.recipes[i]);
        //       var h1 = $("<h1>")
        //       var myImage = $("<img>")
        //       myImage.attr("src",cleanData.recipes[i].image_url)
        //       myImage.attr("class","recipePictures")
        //       h1.text(cleanData.recipes[i].title)
        //       $("#recipes").append(h1);
        //       $("#recipes").append(myImage);
        //     }
        //   });
        
        
        // $.ajax({
        //     url: queryURL,
           
        //     method: "GET"
        // }).then(function(response) {
        //     console.log("This is our response"+ response);
        // })

        
        // $("#wineButton").on("click", function(event){
        //     event.preventDefault();
        //     console.log("We got clicked");
        //     var winePair=$(this).text();
            
        //     console.log(winePair);

            // var queryURL= "http://api.snooth.com/wines/?akey=r5l4astuvugywu5f0f80llsepjff64yp98w008mhhn7jd639&ip=66.28.234.115&t=" +winePair;
            
           
        //     $.ajax({
        //         method: 'GET',
        //         url: 'https://cors-anywhere.herokuapp.com/' + 'http://api.snooth.com/wines/?akey=r5l4astuvugywu5f0f80llsepjff64yp98w008mhhn7jd639&ip=66.28.234.115&q=wine&xp=30'
        //       }).then(function(data) {
        //         var cleanData = JSON.parse(data);
        //         console.log("recipesdata",cleanData);
                
        //       });
            // })

    })

});

//Notes for moving forward:  

//Should the wine button be in the same function with the recipe button?  It might be better to have it in its own click event, since it happens after the recipes are returned and dsiplayed, and the user chooses a recipe.

//Lines 33-42 are meant to populate the cards in the deck with image, title, and link to page.  It's not working. Either the format of the API response is the problem (it looks odd), or my JQuery is bad.