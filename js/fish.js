  export const Fish = function(x,y, ctx) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.velY = 0;
  this.width = 90;
  this.height = 64;
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
    console.log(e);
    if (e.keyCode === 32) {
      //up
      self.velY = -16;
      console.log('spacebar');
    }
  });
};

Fish.prototype.update = function() {
  this.y += this.velY;
  this.velY += 1;
};

Fish.prototype.render = function() {
  let renderX = this.x - this.width / 2;
  let renderY = this.y - this.height / 2;

  this.ctx.drawImage(this.sprites[0], renderX, renderY);

};

// export default Fish;
