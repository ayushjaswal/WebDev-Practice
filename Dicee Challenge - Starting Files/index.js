var randNumber1 = Math.floor(Math.random() * 6) + 1;
var addressImg1 = "images/dice" + randNumber1 + ".png";
var selectorImg1 =  document.querySelectorAll("img")[0];

var randNumber2 = Math.floor(Math.random() * 6) + 1;
var addressImg2 = "images/dice" + randNumber2 + ".png";
var selectorImg2 =  document.querySelectorAll("img")[1];

selectorImg1.setAttribute("src", addressImg1);

selectorImg2.setAttribute("src", addressImg2);

if(randNumber1 > randNumber2){
    document.querySelector("h1").innerText = "🚩Refresh Me";
    document.getElementById("winmsg1").classList.remove("hide");
}
else if(randNumber1 < randNumber2){
    document.querySelector("h1").innerText = "Refresh Me🚩";
    document.getElementById("winmsg2").classList.remove("hide");
}
else{
    document.querySelector("h1").innerText = "TIE!";
}