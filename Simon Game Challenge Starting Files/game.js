var userColorPattern = [];
var gamePattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;  

$(document).on("keydown", function () {
    if(!started){
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userColorPattern.push(userChosenColor);

    selected(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userColorPattern.length-1);
})

function nextSequence() {
    userColorPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColorNS = buttonColor[randomNumber];

    gamePattern.push(randomChosenColorNS);

    $("#" + randomChosenColorNS).fadeOut(100).fadeIn(100);

    selected(randomChosenColorNS);
}


function selected(className) {
    var audio = new Audio("sounds/" + className + ".mp3");
    audio.play();
}

function animatePress(curColor) {
    $("#" + curColor).addClass("pressed")
    setTimeout(function () {
        $("#" + curColor).removeClass("pressed");
    }, 100);
}
function startOver(){
    started = false;
    gamePattern = [];
    level = 0;
}
function checkAnswer(currentLevel) {
    if(userColorPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("Ho gaya bc");
        if(userColorPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } 
    else{
        $("#level-title").html("Your score is: " + level + ". <br>Press Any key to restart");
        selected("wrong");
        $("body").css("background-color", "red");
        setTimeout(function () {
            $("body").css("background-color", "#011F3F");
        }, 200);
        startOver();
        $(document).on("keydown", function () {
            if(!started){
                setTimeout(function(){
                    nextSequence();
                }, 1000);
                started = true;
            }
        });
    } 
}
