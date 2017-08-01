import {Fish} from './fish';

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

const Environment = function() {
  this.canvas = canvas;
  this.ctx = ctx;
  this.bgPos = 0;
  this.fgPos = 0;
  this.bgSpeed = .5;
  this.bgWidth = 500;
  this.bgImg = document.getElementById('bg');
};

Environment.prototype.update = function() {
  this.bgPos -= this.bgSpeed;
  if (this.bgPos < - this.bgWidth)
    this.bgPos = 0;
};

Environment.prototype.render = function() {

  ctx.drawImage(this.bgImg, this.bgPos, 0);
  for (let i = 0; i < canvas.width/this.bgWidth; i++) {

   }
};

const Fish = function(x,y) {
  //remember to put in ctx, when moved to a nother file
 this.ctx = ctx;
 this.x = x;
 this.y = y;
 this.velY = 0;
 this.width = 150;
 this.height = 150;
 this.ticks = 0;
 this.spriteIndex = 0;
 this.sprites = [document.getElementById('fish1'),
 document.getElementById('fish2'),
 document.getElementById('fish3'),
 document.getElementById('fish4'),
 document.getElementById('fish5'),
 document.getElementById('fish6'),
 document.getElementById('fish7'),
 document.getElementById('fish8'),
 ];//do more later
 let self = this;

   window.addEventListener('keydown', function(e){
    //  console.log(e);
     if (e.keyCode === 32) {
       //up
       self.velY = -16;
      //  console.log('spacebar');
     }
   });
};

Fish.prototype.update = function() {
  this.ticks++;
  if (this.ticks % 15 ===  0) {
    //updates every 15 frames
    // this.spriteIndex = (this.spriteIndex + 1) % this.sprites ;

  }
  this.y += this.velY;
  this.velY += 1;
};

Fish.prototype.render = function() {
 let renderX = this.x - this.width / 2;
 let renderY = this.y - this.height / 2;

 this.ctx.drawImage(this.sprites[0], renderX, renderY, 150, 150);

};



const environment = new Environment();
const fish = new Fish(300, 50);
gameLoop();


/*
  Main Game Loop
*/

  ctx.fillStyle = "#FFFFFF";
function gameLoop() {
  ctx.fillRect(0,0, canvas.width, canvas.height);
  environment.update();
  environment.render();
  fish.update();
  fish.render();
  window.requestAnimationFrame(gameLoop);
}

};
