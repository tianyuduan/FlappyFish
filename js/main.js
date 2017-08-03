import { Fish } from './fish';
import { Rock } from './rock';
import { Rock2 } from './rock2';
import {Environment} from './environment';

window.onload = function() {

//constructor
window.score = 0;
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvas2 = document.getElementById('canvas2');
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
const ctx2 = canvas2.getContext('2d');

// ctx2.font = '48px serif';
// ctx2.fillText('Hello world', 500, 500);
fadeOut("Skyfish The Flying Fish", canvas2, ctx2);



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





let gamePaused = false;
//pause
window.addEventListener('keydown', function(e){
  console.log(e);
  if (e.keyCode === 80) {
    gamePaused = true;
  }
});

const ctx = canvas.getContext('2d');
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


playMusic(ctx, true);
gameLoop();

/*
  Main Game Loop
*/

  ctx.fillStyle = "#FFFFFF";
function gameLoop() {
  if (gamePaused) return;


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
        }, 150);
}
