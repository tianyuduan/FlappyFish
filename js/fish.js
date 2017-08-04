export const Fish = function(x,y, ctx) {
  //remember to put in ctx, when moved to a nother file
 this.ctx = ctx;
 this.x = x;
 this.y = y;
 this.velY = 0;
 this.width = 78.9;
 this.height = 70.5;
 this.ticks = 0;
 this.spriteIndex = 0;
 this.dead = false;
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
     if (e.keyCode === 32 || e.keyCode === 38) {
       //up
       self.velY = -12;
     }
   });
};

Fish.prototype.update = function(rocks) {
  this.y += this.velY;
  this.velY += .7;
  if (this.detectCollision(rocks)) {
      this.dead = true;
  }
  // if (this.dead) {
  //   return;
  // }
  this.ticks++;
  if (this.ticks % 15 ===  0) {
    //updates every 15 frames
    this.spriteIndex = (this.spriteIndex + 1) % this.sprites.length ;

  }
};

Fish.prototype.render = function() {
 let renderX =  - this.width / 2;
 let renderY =  - this.height / 2;
this.ctx.save();
this.ctx.translate(this.x, this.y);
this.ctx.scale(-1, 1);
let angle = this.velY / 18;
this.ctx.rotate(angle);
 this.ctx.drawImage(this.sprites[this.spriteIndex], renderX, renderY, 78.9, 70.5);
//105.2, 94
//78.9, 70.5
this.ctx.restore();
};

Fish.prototype.detectCollision = function(rocks) {
  for (let i = 0; i < rocks.length; i++) {
    let e = rocks[i]; //e is top and bottom rock
    let highRock = e.ypos <= 0;
    let x0 = e.xpos, x1 = e.xpos + e.width;

    if (highRock){
      //high rock collison
      let y0 = e.ypos + e.length;
      let alpha = this.x;
      let beta = this.y  - this.height / 2;
      //top fish collison

      let alpha2 = this.x + 70;
      let beta2 = this.y;
      //front fish collison
      //collsion requirements
      if (alpha > x0 && alpha < x1 && beta < y0 ||
        alpha2 > x0 && alpha2 < x1 && beta2 < y0
      ){
        return true;
      }
    }
    else {
      //low rock collison
      let y2 = e.ypos;
      let a = this.x;
      let b = this.y + this.height / 2;
      let alpha2 = this.x + 70;
      let beta2 = this.y;
      //bottom fish collison
      if (a > x0 && a < x1 && b > y2 ||
        alpha2 > x0 && alpha2 < x1 && beta2 > y2) {
        return true;
      }
    }
   }
   return false;
};
