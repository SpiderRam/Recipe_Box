
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
            url: queryURL,
            headers: {
                "Access-Control-Allow-Origin":'*',
                "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
                "Access-Control-Allow-Headers": 'Origin, Content-Type, X-Auth-Token',
                'Content-Type':'application/json',
                
                 },
            method: "GET"
        }).then(function(response) {
            console.log("This is our response"+ response);
        })
    
        
    })
});