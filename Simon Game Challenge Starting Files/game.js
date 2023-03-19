var gamePattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var userChosenColor;
var userColorPattern = [];
var i = 0;
var level = 1;


function nextSequence() {
    var randomNumber = Math.floor(Math.random()*3) + 1;
    randomChosenColor = buttonColor[randomNumber];
    $("h1").text("Level " + level);
    return randomChosenColor;
}
gamePattern.push(nextSequence());

var className = "#" + randomChosenColor;

function selected(className){
    switch (className) {
        case '#blue':
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case '#green':
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case '#red':
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case '#yellow':
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        default:
            break;
    }
}
function userSelected(idName){
    selected("#" + idName);
    userColorPattern.push(idName);

}
function animatePress(curColor){
    $("#" + curColor).addClass("pressed")
    setTimeout(function(){
        $("#" + curColor).removeClass("pressed");
    },100);
}

$(document).on("keydown", function(){
    
    gameEngine(nextSequence())
})
function checkAnswer(){
    for(var i = 0; i < gamePattern.length; i++){
        if(userColorPattern[i] != gamePattern[i]){
            console.log(userColorPattern[i])
            console.log(gamePattern[i])
            console.log("Wrong");
        }
    }
}

function gameEngine(randomChosenColor){
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    selected(randomChosenColor);
    $(".btn").click(function(){
        userChosenColor = this.id;
        userSelected(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer();
    });
    console.log("Game Pattern") ;
    console.log(gamePattern);
    console.log("User Color Pattern");
    console.log(userColorPattern);
}
// gameEngine(nextSequence())
