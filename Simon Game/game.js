var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


function nextSeq(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);

  var randomNum = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);



  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)

  playSound(randomChosenColor);
}

$(".btn").click(function (){
  var userChosenColor = $(this).attr("id")
  userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});


function playSound(name){
  var audio = new Audio('sounds/'+ name + '.mp3');
  audio.play();

}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

$(document).keypress(function(){
  if (!started){
    $("#level-title").text("Level " + level);
    nextSeq();
    started = true;
  }
})

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSeq();
      },1000);
    }
  }
  else {
    console.log("wrong");
    var wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    },200);

    $('h1').text("Game Over! :)");

    startOver();

  }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
  }
