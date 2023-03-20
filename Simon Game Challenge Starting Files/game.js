var userColorPattern = [];
var gamePattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];


var level = 1;  
function nextSequence() {
    $("h1").text("Level " + level);
    var randomChosenColorNS;
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColorNS = buttonColor[randomNumber];
    level++;
    return randomChosenColorNS;
}


function selected(className) {
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

function gameSelected(className, randomChosenColor) {
    $(className).fadeOut(100).fadeIn(100);
    selected(className);
    gamePattern.push(randomChosenColor);
}

function userSelected(idName, userColorPattern) {
    selected("#" + idName);
    userColorPattern.push(idName);
}

function animatePress(curColor) {
    $("#" + curColor).addClass("pressed")
    setTimeout(function () {
        $("#" + curColor).removeClass("pressed");
    }, 100);
}

$(document).on("keydown", function () {
    gameEngine(userColorPattern);
})
function checkAnswer(userColorPattern, k) {
    for(var i = 0; i < k; i++){
        if (userColorPattern[i] != gamePattern[i]) {
            return false;
        }
    return true;}
}

function gameEngine(userColorPattern) {
    var userChosenColor;
    var randomChosenColor = nextSequence();
    var className = "#" + randomChosenColor;
    gameSelected(className, randomChosenColor);
    $(".btn").click(function () {
        var k = 0
        userChosenColor = this.id;
        userSelected(userChosenColor, userColorPattern);
        animatePress(userChosenColor);
        if(checkAnswer(userColorPattern, k)){
            console.log("Sahi h ye");
        }
        else{
            console.log("Abe mc")
        }
    });
    console.log("User Color Pattern");
    console.log(userColorPattern);
}
// gameEngine(nextSequence())
