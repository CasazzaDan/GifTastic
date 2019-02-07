$(document).ready(function () {

    // Create a array of strings, with the variables for "topics" to turn into buttons to display the gifs for that topic
    var topics = ["seinfeld", "shameless", "brooklyn 99", "archer", "house of lies", "billions", "martin", "waynes brothers", "rugrats", "rocket power"];
    
    // Fuction to add a new topic button to get new gifs
    function makeButtons() {
        $("#show-button").empty();

        for ( i = 0; i < topics.length; i++ ) {

            var a = $("<button>");
            a.addClass("gifButton");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#show-button").append(a);
        }
    }
    makeButtons();

    // Pushing the input value into the array and creating a button to grab those gifs
    $("#add-topic").on("click", function () {
        event.preventDefault();
        var topic = $("#user-input").val().trim();
        topics.push(topic);
        makeButtons();
        return;
    });

    // Function to listen for a button to be clicked so it can send the request to the api for the appropriate gifs 
    $("button").on("click", function() {
        var show = $(this).attr("data-name");
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=8S35sobPSipKGEYqydj4P3WQCennaqVS&&limit=10"


        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response) {
            
            var results = response.data;
            console.log(results)
            

            for(var i =0; i <results.length; i++) {
                var showDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var showImg = $("<img>");

                showImg.attr("src", results[i].images.original_still.url);
                showImg.attr("data-still", results[i].images.original_still.url);
                showImg.attr("data-animate", results[i].images.original.url);
                showImg.attr("data-state", "still");
                showImg.attr("id", "gif");

                showDiv.append(showImg);
                showDiv.append(p);
                $("#display-images").prepend(showDiv);


            }
            
        });
        
    });

    // Change from still to animate
    function changeGifState() {
        var state = $(this).attr("data-state");
        var animateImg = $(this).attr("data-animate");
        var stillImg = $(this).attr("data-still");

        if (state === "still"){
            $(this).attr("src", animateImg);
            $(this).attr("data-state", "animate");
        }
        else if (state === "animate") {
            $(this).attr("src", stillImg);
            $(this).attr("data-state", "still");
        }

    }
     
    $(document).on("click", "#gif", changeGifState);
});
