export const Environment = function(ctx, canvas) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.bgPos = 0;
  this.fgPos = 0;
  this.bgSpeed = 2;
  this.bgWidth = 3000;
  this.bgImg = document.getElementById('bg');
  this.song = document.getElementById('underthesea');
};

Environment.prototype.update = function() {
  this.bgPos -= this.bgSpeed;
  if (this.bgPos  < - this.bgWidth + 1400)
    this.bgPos = 0;
};

Environment.prototype.render = function(canvas, ctx) {

  for (let i = 0; i <= this.canvas.width/this.bgWidth; i++) {
    //canvas == innerWidth(1500) / 1280 ~ ~2
    this.ctx.drawImage(this.bgImg, this.bgPos+i*this.bgWidth, 0);
   }
};
