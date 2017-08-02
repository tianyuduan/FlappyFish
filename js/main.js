import { Fish } from './fish';
import { Rock } from './rock';
import { Rock2 } from './rock2';
import {Environment} from './environment';

window.onload = function() {

const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

// ctx.fillRect(0, 0, 800, 200); // ctx.fillStyle = "#00FF00"; // // ctx.strokeRect(300, 20, 20, 20); // ctx.strokeStyle = "#FF0000";
// const fish1 = new Image();
// fish1.src = '../FlappyFish/images/382.png';
// fish1.onload = function() {
//   ctx.drawImage(fish1, 500, 20);
// };
//
// };


const environment = new Environment(ctx, canvas);
const fish = new Fish(300, 400, ctx);
const rocks = [];
 // function(xpos, ypos, length, speed, ctx)
 setTimeout(function(){
  let rockSet = generateRock(ctx, canvas.width, canvas.height);
  rocks.push(rockSet.top, rockSet.bottom);
}, 500);


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
  ctx.fillRect(0,0, canvas.width, canvas.height);
  environment.update();
  environment.render();
  rocks.forEach(function(rock) {

    rock.update();
    rock.render();

  });
  if (fish.dead) {
    drawGameOver(ctx, canvas);
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
