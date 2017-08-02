import { Fish } from './fish';
import { Rock } from './rock';
import { Rock2 } from './rock2';
import {Environment} from './environment';





window.onload = function() {

window.score = 0;

const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');


const environment = new Environment(ctx, canvas);
const fish = new Fish(300, 400, ctx);
const rocks = [];
 // function(xpos, ypos, length, speed, ctx)
 setTimeout(function(){
  let rockSet = generateRock(ctx, canvas.width, canvas.height);
  rocks.push(rockSet.top, rockSet.bottom);
}, 500);


setInterval( function(){
  if (!fish.dead){
  window.score++;
  console.log(window.score);
  }
  ctx.font = "30px Verdana";
  ctx.textAlign = 'center';
  ctx.fillText(`Score: ${window.score}`, canvas.width/3, canvas.height/3);

}, 3000);

function drawScore() {

}


 setInterval(function(){
   let rockSet = generateRock(ctx, canvas.width, canvas.height);
   rocks.push(rockSet.top, rockSet.bottom);
 }, 3000);



gameLoop();

/*
  Main Game Loop
*/

  ctx.fillStyle = "#FFFFFF";
function gameLoop() {
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
