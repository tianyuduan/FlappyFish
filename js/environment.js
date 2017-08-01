const Environment = function(ctx, canvas) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.bgPos = 0;
  this.fgPos = 0;
  this.bgSpeed = 2;
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

const environment = new Environment();
