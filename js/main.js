import { Fish } from './fish';
import { Rock } from './rock';
import { Rock2 } from './rock2';
import {Environment} from './environment';

// var port = process.env.PORT || 5000;
window.onload = function() {

//constructor
//game logic
window.score = 0;
const canvas = document.getElementById('canvas');
canvas.width =  window.innerWidth * (3/4);
canvas.height = window.innerHeight * (3/4);
const ctx = canvas.getContext('2d');

//score
const canvas2 = document.getElementById('canvas2');
canvas2.width =  window.innerWidth * (3/4);
canvas2.height = window.innerHeight * (3/4);
const ctx2 = canvas2.getContext('2d');


//lyrics
const canvas3 = document.getElementById('canvas3');
canvas3.width =  window.innerWidth * (3/4);
canvas3.height = window.innerHeight * (3/4);
const ctx3 = canvas3.getContext('2d');

// ctx2.font = '48px serif';
// ctx2.fillText('Welcome to Sky Fish', 500, 500);


//game loading
 window.gameStarted = false;
//resets
 document.body.addEventListener("keydown", function(event){

if (event.keyCode === 13 && !window.gameStarted && fish.dead) {
  document.location.href = "";
}
 });


//loading screen + start logic
document.body.addEventListener("keydown", function(event){

if(event.keyCode === 13 && !window.gameStarted){
  gameLoop();

if (! fish.dead) {

    fadeOut("Skyfish The Flying Fish", canvas3, ctx3);

    ctx.restore();
    ctx.shadowColor = "transparent";

     setTimeout(function(){
      let rockSet = generateRock(ctx, canvas.width, canvas.height);
      rocks.push(rockSet.top, rockSet.bottom);
    }, 500);


     setInterval(function(){
       let rockSet = generateRock(ctx, canvas.width, canvas.height);
       rocks.push(rockSet.top, rockSet.bottom);
     }, 3000);
     //game story

     setTimeout(function(){

        fadeOutLyrics("is lost...", canvas3, ctx3);

     }, 7000);

     setTimeout(function(){

        fadeOutLyrics("can you help him back to his home?", canvas3, ctx3);

     }, 14000);

     setTimeout(function(){

        fadeOutLyrics("just keep flapping... just keep flapping...", canvas3, ctx3);

     }, 19000);

     setTimeout(function(){

        fadeOutLyrics("We will find his home one day!", canvas3, ctx3);

     }, 24000);






     //lyrics
     setTimeout(function(){

        fadeOutLyrics("See, I was on the verge of breaking down", canvas3, ctx3);

     }, 41000);

     setTimeout(function(){

        fadeOutLyrics("Sometimes silence can seem so loud", canvas3, ctx3);

     }, 47500);


}


}

  introScreen();
  // introLoop();
});

function introScreen() {

ctx.font = "50px Impact";
ctx.fillStyle = "#0099CC";
ctx.textAlign = "center";

canvas.width = window.innerWidth * (3/4);
canvas.height = window.innerHeight * (3/4);

let image = document.getElementById('ld');
let fishImage = document.getElementById('fish1');
ctx.drawImage(image, 0, 0);
ctx.drawImage(fishImage, canvas.width/13, canvas.height/35, 150, 150);

ctx.font = "bold 60px Tahoma";
ctx.fillStyle = "DeepSkyBlue";
// ctx.strokeStyle = "DarkSlateGray";
ctx.shadowOffsetX = 4;
ctx.shadowOffsetY = 4;
ctx.shadowBlur = 6;
ctx.shadowColor = 'rgba(0,0,255, .5)';


ctx.fillText("Flappy Fish", canvas.width/2, canvas.height/3);
// ctx.strokeText("Flappy Fish", canvas.width/2, canvas.height/2);
ctx.fillText("Press Enter To Start", canvas.width/2.5, canvas.height/2 + 50);

ctx.fillStyle = "white";
ctx.fillRect(canvas.width/ 19, canvas.height / 3, 150, 250);
ctx.shadowColor = 'transparent';
ctx.fillStyle = 'gray';
ctx.font = '24px Tahoma';
ctx.fillText("Instructions: ", canvas.width/ 16, canvas.height / 2.5);
ctx.font = '18px Tahoma';
ctx.fillText("Be quick!", canvas.width/ 16, canvas.height / 2);
ctx.fillText("press spacebar", canvas.width/ 16, canvas.height / 1.75);
ctx.fillText("or ", canvas.width/ 16, canvas.height / 1.625);
ctx.fillText("up arrow key", canvas.width/ 16, canvas.height / 1.5);
ctx.fillText("to jump!", canvas.width/ 16, canvas.height / 1.375);



}

function introLoop() {
  environment.update();
  environment.render();
}



setInterval( function(){
  ctx2.font = "30px Verdana";
  ctx2.textAlign = 'center';

  ctx2.fillStyle = '#000000'; // or whatever color the background is.
  ctx2.fillText(`Score: ${window.score}`, canvas2.width/ 8, canvas2.height/1.1);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx2.fillStyle = '#ffffff'; // or whatever color the text should be.
  ctx2.fillText(`Your Score: ${window.score}`, canvas2.width /8, canvas2.height/1.1);

}, 500);
//Song Lyrics


let gamePaused = false;
//pause
window.addEventListener('keydown', function(e){

  if (e.keyCode === 80) {
    gamePaused = true;
  }
});

const environment = new Environment(ctx, canvas);
const fish = new Fish(300, 400, ctx);
const rocks = [];
 // function(xpos, ypos, length, speed, ctx)

//if the game is running

/*
  Main Game Loop
*/

  ctx.fillStyle = "#FFFFFF";
function gameLoop() {
  window.gameStarted = true;
  if (gamePaused) return;
  playMusic(ctx, true);
  ctx.fillRect(0,0, canvas.width, canvas.height);
  environment.update();
  environment.render();
  rocks.forEach(function(rock) {

    rock.update();
    rock.render();

  });
  if (fish.dead) {
    drawGameOver(ctx, canvas);
    playMusic(ctx, false);
    window.gameStarted = false;
    window.cancelAnimationFrame(gameLoop);
    return ;
  }
  if (!fish.dead){
  window.score++;
  }

  if (fish.dead && window.gameStarted) {

  }

  fish.update(rocks);
  fish.render();
  // if (detectCollision(fish, rocks)) {
  //     alert("You lost! ");
  //     window.location = './index.html';
  //   }
    window.requestAnimationFrame(gameLoop);
  }





};

function generateRock(ctx, canvasWidth, canvasHeight) {

  let lengthTop = Math.round(Math.random()* 200 + 10);
  let lengthBottom = canvasHeight - 300 - lengthTop;
  let returnVal = {};
  returnVal.top = new Rock2(canvasWidth, - 5, lengthTop, 3, ctx );
  returnVal.bottom = new Rock(canvasWidth, canvasHeight + 5 - lengthBottom,
    lengthBottom, 3, ctx );
  return returnVal;
}

function drawGameOver(ctx, canvas) {
  ctx.font = "30px Verdana";
  ctx.fillStyle = "White";
  ctx.textAlign = 'center';
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur = 6;
  ctx.shadowColor = 'rgba(0,255,0, .5)';
  ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
  ctx.restore();
}



function playMusic(ctx, play) {
    let audio = document.getElementById('kellyfly');
    if (play === true ) {
      return audio.play();
    }
    else {
      return audio.pause();
    }
}

function fadeOut(text, canvas, context) {
    var alpha = 1.0,   // full opacity
        interval = setInterval(function () {
            canvas.width = canvas.width; // Clears the canvas
            context.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
            context.font = "italic 36pt Arial";
            context.fillText(text, canvas.width / 8, canvas.height / 6);
            alpha = alpha - 0.05; // decrease opacity (fade out)
            if (alpha < 0) {
                canvas.width = canvas.width;
                clearInterval(interval);
            }
        }, 500);
}

function fadeOutLyrics(text, canvas, context) {
    var alpha = 1.0,   // full opacity
        interval = setInterval(function () {
            canvas.width = canvas.width; // Clears the canvas
            context.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
            context.font = "italic 36pt Arial";
            context.fillText(text, canvas.width / 6, canvas.height/ 1.6);
            alpha = alpha - 0.1; // decrease opacity (fade out)
            if (alpha < 0) {
                canvas.width = canvas.width;
                clearInterval(interval);
            }
        }, 500);
}
