import { Fish } from './fish';
import { Rock } from './rock';
import { Rock2 } from './rock2';
import {Environment} from './environment';

window.onload = function() {

//constructor
//game logic
window.score = 0;
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = 600;
const ctx = canvas.getContext('2d');

//score
const canvas2 = document.getElementById('canvas2');
canvas2.width = window.innerWidth;
canvas2.height = 600;
const ctx2 = canvas2.getContext('2d');


//lyrics
const canvas3 = document.getElementById('canvas3');
canvas3.width = window.innerWidth;
canvas3.height = 600;
const ctx3 = canvas3.getContext('2d');

ctx2.font = '48px serif';
ctx2.fillText('Hello world', 500, 500);

let gameStarted = false;

document.body.addEventListener("keydown", function(event){

if(event.keyCode === 13 && !gameStarted){
  gameLoop();
}
  introScreen();
});

function introScreen() {

ctx.font = "50px Impact";
ctx.fillStyle = "#0099CC";
ctx.textAlign = "center";

canvas.width = window.innerWidth;
canvas.height = 600;

ctx.font = "40px Arial";
ctx.fillText("Flappy Fish", canvas.width/2, canvas.height/2);

ctx.fillText("Press Enter To Start", canvas.width/2, canvas.height/2 + 50);

}





setInterval( function(){
  if (!fish.dead){
  window.score++;
  }
  ctx2.font = "30px Verdana";
  ctx2.textAlign = 'center';

  ctx2.fillStyle = '#000000'; // or whatever color the background is.
  ctx2.fillText(`Score: ${window.score}`, canvas2.width/10, canvas2.height/1.1);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx2.fillStyle = '#ffffff'; // or whatever color the text should be.
  ctx2.fillText(`Your Score: ${window.score}`, canvas2.width/10, canvas2.height/1.1);

}, 500);


fadeOut("Skyfish The Flying Fish", canvas3, ctx3);
//Song Lyrics


setTimeout(function(){

   fadeOutLyrics("See, I was on the verge of breaking down", canvas3, ctx3);

}, 41000);

setTimeout(function(){

   fadeOutLyrics("Sometimes silence can seem so loud", canvas2, ctx2);

}, 47500);


let gamePaused = false;
//pause
window.addEventListener('keydown', function(e){
  console.log(e);
  if (e.keyCode === 80) {
    gamePaused = true;
  }
});

const environment = new Environment(ctx, canvas);
const fish = new Fish(300, 400, ctx);
const rocks = [];
 // function(xpos, ypos, length, speed, ctx)
 setTimeout(function(){
  let rockSet = generateRock(ctx, canvas.width, canvas.height);
  rocks.push(rockSet.top, rockSet.bottom);
}, 500);

function drawScore() {

}


 setInterval(function(){
   let rockSet = generateRock(ctx, canvas.width, canvas.height);
   rocks.push(rockSet.top, rockSet.bottom);
 }, 3000);


/*
  Main Game Loop
*/

  ctx.fillStyle = "#FFFFFF";
function gameLoop() {
  gameStarted = true;
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
    return ;
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

  let lengthTop = Math.round(Math.random()* 300 + 10);
  let lengthBottom = canvasHeight - 400 - lengthTop;
  let returnVal = {};
  returnVal.top = new Rock2(canvasWidth, - 5, lengthTop, 3, ctx );
  returnVal.bottom = new Rock(canvasWidth, canvasHeight + 5 - lengthBottom,
    lengthBottom, 3, ctx );
  return returnVal;
}

function drawGameOver(ctx, canvas) {
  ctx.font = "30px Verdana";
  ctx.textAlign = 'center';
  ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
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
            context.font = "italic 70pt Arial";
            context.fillText(text, 200, 500);
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
            context.fillText(text, 100, 500);
            alpha = alpha - 0.05; // decrease opacity (fade out)
            if (alpha < 0) {
                canvas.width = canvas.width;
                clearInterval(interval);
            }
        }, 500);
}

function fadeOutLyricsAppend(text, canvas, context) {
    var alpha = 1.0,   // full opacity
        interval = setInterval(function () {
            canvas.width = canvas.width; // Clears the canvas
            context.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
            context.font = "italic 36pt Arial";
            context.fillText(text, 100, 700);
            alpha = alpha - 0.3; // decrease opacity (fade out)
            if (alpha < 0) {
                canvas.width = canvas.width;
                clearInterval(interval);
            }
        }, 500);
}
