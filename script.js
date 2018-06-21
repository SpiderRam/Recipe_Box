
//which order does the api's and firebase go in?
console.log("page loaded");
// var recipeData=firebase.database();
$(document).ready(function(){

    
    $(".dropdown-item").on("click", function(event){
        event.preventDefault();
        console.log("We got clicked");
        var meatChoice=$(this).text();
        
        console.log(meatChoice);
        
        // var pickedRecipe={
            // name: recipeName,
            
        // }
        
        // recipeData.ref().push(pickedRecipe);
        
        // $("#meatChoiceInput").val("");
        
        var queryURL = " http://food2fork.com/api/search?key=5efd6700d05dd5b856e7fc18388f7e35&q="+ meatChoice;
        
        $.ajax({
            method: 'GET',
            url: 'https://cors-anywhere.herokuapp.com/' + 'food2fork.com/api/search?key=5efd6700d05dd5b856e7fc18388f7e35&q=chicken'
          }).then(function(data) {
            console.log(data);
          });
        
        
        // $.ajax({
        //     url: queryURL,
           
        //     method: "GET"
        // }).then(function(response) {
        //     console.log("This is our response"+ response);
        // })

        
        $("#wineButton").on("click", function(event){
            event.preventDefault();
            console.log("We got clicked");
            var winePair=$(this).text();
            
            console.log(winePair);

            var queryURL= "http://api.snooth.com/wines/?akey=r5l4astuvugywu5f0f80llsepjff64yp98w008mhhn7jd639&ip=66.28.234.115&q=wine&xp=30" +winePair;
            
           
            $.ajax({
                method: 'GET',
                url: 'https://cors-anywhere.herokuapp.com/' + 'http://api.snooth.com/wines/?akey=r5l4astuvugywu5f0f80llsepjff64yp98w008mhhn7jd639&ip=66.28.234.115&q=wine&xp=30'
              }).then(function(data) {
                console.log(data);
              });
            })
        
    })
});