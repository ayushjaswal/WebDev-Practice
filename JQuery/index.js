$("button").click(function(){
    $("h1").css("color", "purple");
});

$("button").on("click", function(event){
    $("h1").slideToggle();

})