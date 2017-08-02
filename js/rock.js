export const Rock = function(xpos, ypos, length, speed, ctx){
  //add ctx;
  this.ctx = ctx;
  this.ypos = ypos;
  this.xpos = xpos;
  this.speed = speed;
  this.length = length;
  this.width = 100;
  this.rock = document.getElementById('rock1');

};

Rock.prototype.update = function() {
  this.xpos -= this.speed;

};

Rock.prototype.render = function() {
  this.ctx.save();
  this.ctx.drawImage(this.rock, this.xpos, this.ypos, this.width, this.length);
  // this.ctx.fillStyle = "#000000"; //black.
  // this.ctx.fillRect(this.xpos, this.ypos, this.width, this.length); //canvas fill rect at x, y, width and height
  //pos = x,
  // this.ctx.fillStyle = '#CD853F'; //light brown
  // this.ctx.fillRect(this.xpos + 5, this.ypos  + 5, this.width, this.length - 10); //canvas fill rect at x, y, width and height


  this.ctx.restore();

};
