function randomRGB() {
  return Math.floor(Math.random() * 256);
}

function RGBvalue() {
  this.R =  randomRGB();
  this.G =  randomRGB();
  this.B =  randomRGB();
}

function getRGBcolor(rgbvalue){
    return "rgb(" +  rgbvalue.R + ","
            + rgbvalue.G + ","
            + rgbvalue.B + ")";
  }

function newGame() {
      document.getElementById("newGame").innerHTML = "New Game";
      answerRGB = new RGBvalue();
      $(".square").css("background-color", getRGBcolor(answerRGB));
      document.getElementById("head").classList.add("selected");
      document.getElementById("info").innerHTML = infoDefaultText;
      $(".square").show();
      displayValue();
      makecolors();
      gameEnd = 0;
    }

function makecolors(){
      rightBlock = Math.floor(Math.random() * 6);

      for (i = 0; i < blockNum ; i ++){
        if (i != rightBlock) {
          var wrongrgb = new RGBvalue();
          changeRGBByMode(wrongrgb);
          $("#" + blockIds[i]).css("background-color", getRGBcolor(wrongrgb));
        }
      }
      rightBlockid = blockIds[rightBlock];
}

function changeRGBByMode(rgbvalue){
  rgbvalue.R = answerRGB.R + (rgbvalue.R - answerRGB.R) * difficultyMultiplier;
  rgbvalue.G = answerRGB.G + (rgbvalue.G - answerRGB.G) * difficultyMultiplier;
  rgbvalue.B = answerRGB.B + (rgbvalue.B - answerRGB.B) * difficultyMultiplier;
}
function sendguess(id){
    if (gameEnd == 0) {
      if (id == rightBlockid){
        Youwin();
      }
      else {
        $("#"+id).fadeOut("slow");
        wrong()
      }

    }
}

function Youwin(){
  document.getElementById("info").innerHTML = "Yes you win!";
  document.getElementById("newGame").innerHTML = "Try Again?";
  document.getElementById("head").classList.remove("selected");
  $("#head").css("background-color", getRGBcolor(answerRGB));
  $(".square").css("background-color", getRGBcolor(answerRGB));
  $(".square").show();
  gameEnd = 1;
}

function wrong(){
  document.getElementById("info").innerHTML = "Wrong answer, try again!";
  setTimeout(function(){
    document.getElementById("info").innerHTML = infoDefaultText;
  }, 2000);
}

function easyMode(){
  easy.classList.add("selected");
  hard.classList.remove("selected");
  difficultyMultiplier = 1;
}

function hardMode(){
  hard.classList.add("selected");
  easy.classList.remove("selected");
  difficultyMultiplier = 0.5;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
    return "#" + componentToHex(rgb.R) + componentToHex(rgb.G) + componentToHex(rgb.B);
}

function displayHexValue(){
  hexbutton.classList.add("selected");
  rgbbutton.classList.remove("selected");
  displayRGB = 0;
  displayValue();
}

function displayrgbValue(){
  hexbutton.classList.remove("selected");
  rgbbutton.classList.add("selected");
  displayRGB = 1;
  displayValue();
}

function displayValue(){
  if (displayRGB){
    document.getElementById('answerValue').innerHTML = "RGB: ("+ answerRGB.R + ", " +
                                                      answerRGB.G + ", " + answerRGB.B + ")";
  } else {
    document.getElementById('answerValue').innerHTML = "Hex: " + rgbToHex(answerRGB);
  }
}

function init(){
  document.getElementById("newGame").addEventListener("click", newGame);

  easy.addEventListener("click", function(){easyMode();});
  hard.addEventListener("click", function(){hardMode();});
  hexbutton.addEventListener("click", function(){displayHexValue();});
  rgbbutton.addEventListener("click", function(){displayrgbValue();});

  Array.from(document.getElementsByClassName('square')).forEach((el) => {
       el.addEventListener("click", function(){
         sendguess(this.id)
      });
  });
  answerRGB = new RGBvalue();
}

var answerRGB = new RGBvalue();
var blockNum = 12;
var difficultyMultiplier = 1;
var rightBlock = 0;
var gameEnd = 0;
var displayRGB = 1;
var rightBlockid = "";
var blockIds = ["color1", "color2", "color3", "color4", "color5", "color6"];
var infoDefaultText = "Press the color that matches the given RBG values.";
var easy = document.getElementById("easyMode");
var hard = document.getElementById("hardMode");
var hexbutton = document.getElementById("hex");
var rgbbutton = document.getElementById("rgb");

// Create an image element
var img = document.createElement('IMG');
// When the image is loaded, draw it
img.onload = function () {
    // Save the state, so we can undo the clipping
    ctx.save();
    // Create a shape, of some sort
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(100, 30);
    ctx.lineTo(180, 10);
    ctx.lineTo(200, 60);
    ctx.arcTo(180, 70, 120, 0, 10);
    ctx.lineTo(200, 180);
    ctx.lineTo(100, 150);
    ctx.lineTo(70, 180);
    ctx.lineTo(20, 130);
    ctx.lineTo(50, 70);
    ctx.closePath();
    // Clip to the current path
    ctx.clip();
    ctx.drawImage(img, 0, 0);
    // Undo the clipping
    ctx.restore();
}
// Specify the src to load the image
img.src = "https://www.google.com/images/srpr/logo3w.png";

init();
newGame();
