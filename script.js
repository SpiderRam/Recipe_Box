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
        var wineColor = "";

       
        // set wine color based on meat choice
        if (meatChoice == "Pork") {
          var wineColor = "amber";
        }
        if(meatChoice=="Tofu"){
          var wineColor="clear";
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
            var wineTitle=$("<a>");
            wineTitle.text(cleanData.wines[i].name);
            wineTitle.attr("href", cleanData.wines[i].link);
            wineTitle.attr("target", "_blank");
            var wineImage = $("<img>");
            wineImage.attr("src",cleanData.wines[i].image);
            $("#wines").append(wineTitle);
            $("#wines").append(wineImage);
          }
          $.ajax({
            method: 'GET',
            url: 'https://cors-anywhere.herokuapp.com/' + 'food2fork.com/api/search?key=5efd6700d05dd5b856e7fc18388f7e35&q='+ meatChoice
          }).then(function(data) {
            $("#mainDiv").empty();
            var cleanData = JSON.parse(data);
            console.log("recipesdata",cleanData);
            for(var i=0; i < cleanData.recipes.length; i++ ){
              console.log("Individual Recipe",cleanData.recipes[i]);
              var recipeTitle = $("<a>")
              var myImage = $("<img>")
              myImage.attr("src",cleanData.recipes[i].image_url)
              recipeTitle.attr("src",cleanData.recipes[i].f2f_url)
              // myImage.attr("src",cleanData.recipes[i].f2f_url)
              myImage.attr("class","recipePictures")
              recipeTitle.text(cleanData.recipes[i].title)

              recipeTitle.attr("href", cleanData.recipes[i].f2f_url);
            
              recipeTitle.attr("target", "_blank");


              $("#recipes").append(recipeTitle);
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

