/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fish = __webpack_require__(1);

var _rock = __webpack_require__(2);

var _rock2 = __webpack_require__(3);

var _environment = __webpack_require__(4);

window.onload = function () {

  //constructor
  //game logic
  window.score = 0;
  var canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = 600;
  var ctx = canvas.getContext('2d');

  //score
  var canvas2 = document.getElementById('canvas2');
  canvas2.width = window.innerWidth;
  canvas2.height = 600;
  var ctx2 = canvas2.getContext('2d');

  //lyrics
  var canvas3 = document.getElementById('canvas3');
  canvas3.width = window.innerWidth;
  canvas3.height = 600;
  var ctx3 = canvas3.getContext('2d');

  ctx2.font = '48px serif';
  ctx2.fillText('Hello world', 500, 500);

  var gameStarted = false;

  document.body.addEventListener("keydown", function (event) {

    if (event.keyCode === 13 && !gameStarted) {
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
    ctx.fillText("Flappy Fish", canvas.width / 2, canvas.height / 2);

    ctx.fillText("Press Enter To Start", canvas.width / 2, canvas.height / 2 + 50);
  }

  setInterval(function () {
    if (!fish.dead) {
      window.score++;
    }
    ctx2.font = "30px Verdana";
    ctx2.textAlign = 'center';

    ctx2.fillStyle = '#000000'; // or whatever color the background is.
    ctx2.fillText('Score: ' + window.score, canvas2.width / 10, canvas2.height / 1.1);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.fillStyle = '#ffffff'; // or whatever color the text should be.
    ctx2.fillText('Your Score: ' + window.score, canvas2.width / 10, canvas2.height / 1.1);
  }, 500);

  fadeOut("Skyfish The Flying Fish", canvas3, ctx3);
  //Song Lyrics


  setTimeout(function () {

    fadeOutLyrics("See, I was on the verge of breaking down", canvas3, ctx3);
  }, 41000);

  setTimeout(function () {

    fadeOutLyrics("Sometimes silence can seem so loud", canvas2, ctx2);
  }, 47500);

  var gamePaused = false;
  //pause
  window.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.keyCode === 80) {
      gamePaused = true;
    }
  });

  var environment = new _environment.Environment(ctx, canvas);
  var fish = new _fish.Fish(300, 400, ctx);
  var rocks = [];
  // function(xpos, ypos, length, speed, ctx)
  setTimeout(function () {
    var rockSet = generateRock(ctx, canvas.width, canvas.height);
    rocks.push(rockSet.top, rockSet.bottom);
  }, 500);

  function drawScore() {}

  setInterval(function () {
    var rockSet = generateRock(ctx, canvas.width, canvas.height);
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
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    environment.update();
    environment.render();
    rocks.forEach(function (rock) {

      rock.update();
      rock.render();
    });
    if (fish.dead) {
      drawGameOver(ctx, canvas);
      playMusic(ctx, false);
      return;
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

  var lengthTop = Math.round(Math.random() * 300 + 10);
  var lengthBottom = canvasHeight - 400 - lengthTop;
  var returnVal = {};
  returnVal.top = new _rock2.Rock2(canvasWidth, -5, lengthTop, 3, ctx);
  returnVal.bottom = new _rock.Rock(canvasWidth, canvasHeight + 5 - lengthBottom, lengthBottom, 3, ctx);
  return returnVal;
}

function drawGameOver(ctx, canvas) {
  ctx.font = "30px Verdana";
  ctx.textAlign = 'center';
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}

function playMusic(ctx, play) {
  var audio = document.getElementById('kellyfly');
  if (play === true) {
    return audio.play();
  } else {
    return audio.pause();
  }
}

function fadeOut(text, canvas, context) {
  var alpha = 1.0,
      // full opacity
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
  var alpha = 1.0,
      // full opacity
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
  var alpha = 1.0,
      // full opacity
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Fish = exports.Fish = function Fish(x, y, ctx) {
  //remember to put in ctx, when moved to a nother file
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.velY = 0;
  this.width = 157.8;
  this.height = 141;
  this.ticks = 0;
  this.spriteIndex = 0;
  this.dead = false;
  this.sprites = [document.getElementById('fish1'), document.getElementById('fish2'), document.getElementById('fish3'), document.getElementById('fish4'), document.getElementById('fish5'), document.getElementById('fish6'), document.getElementById('fish7'), document.getElementById('fish8')]; //do more later
  var self = this;
  window.addEventListener('keydown', function (e) {
    if (e.keyCode === 32 || e.keyCode === 38) {
      //up
      self.velY = -16;
    }
  });
};

Fish.prototype.update = function (rocks) {
  this.y += this.velY;
  this.velY += 1;
  if (this.detectCollision(rocks)) {
    // this.dead = true;
  }
  if (this.dead) {
    return;
  }
  this.ticks++;
  if (this.ticks % 15 === 0) {
    //updates every 15 frames
    this.spriteIndex = (this.spriteIndex + 1) % this.sprites.length;
  }
};

Fish.prototype.render = function () {
  var renderX = -this.width / 2;
  var renderY = -this.height / 2;
  this.ctx.save();
  this.ctx.translate(this.x, this.y);
  this.ctx.scale(-1, 1);
  var angle = this.velY / 18;
  this.ctx.rotate(angle);
  this.ctx.drawImage(this.sprites[this.spriteIndex], renderX, renderY, 157.8, 141);
  //105.2, 94
  this.ctx.restore();
};

Fish.prototype.detectCollision = function (rocks) {
  for (var i = 0; i < rocks.length; i++) {
    var e = rocks[i]; //e is top and bottom rock
    var highRock = e.ypos <= 0;
    var x0 = e.xpos,
        x1 = e.xpos + e.width;

    if (highRock) {
      //high rock collison
      var y0 = e.ypos + e.length;
      var alpha = this.x;
      var beta = this.y - this.height / 2;
      //top fish collison

      var alpha2 = this.x + 70;
      var beta2 = this.y;
      //front fish collison
      //collsion requirements
      if (alpha > x0 && alpha < x1 && beta < y0 || alpha2 > x0 && alpha2 < x1 && beta2 < y0) {
        return true;
      }
    } else {
      //low rock collison
      var y2 = e.ypos;
      var a = this.x;
      var b = this.y + this.height / 2;
      var _alpha = this.x + 70;
      var _beta = this.y;
      //bottom fish collison
      if (a > x0 && a < x1 && b > y2 || _alpha > x0 && _alpha < x1 && _beta > y2) {
        return true;
      }
    }
  }
  return false;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Rock = exports.Rock = function Rock(xpos, ypos, length, speed, ctx) {
  //add ctx;
  this.ctx = ctx;
  this.ypos = ypos;
  this.xpos = xpos;
  this.speed = speed;
  this.length = length;
  this.width = 100;
  this.rock = document.getElementById('rock1');
};

Rock.prototype.update = function () {
  this.xpos -= this.speed;
};

Rock.prototype.render = function () {
  this.ctx.save();
  this.ctx.drawImage(this.rock, this.xpos, this.ypos, this.width, this.length);
  // this.ctx.fillStyle = "#000000"; //black.
  // this.ctx.fillRect(this.xpos, this.ypos, this.width, this.length); //canvas fill rect at x, y, width and height
  //pos = x,
  // this.ctx.fillStyle = '#CD853F'; //light brown
  // this.ctx.fillRect(this.xpos + 5, this.ypos  + 5, this.width, this.length - 10); //canvas fill rect at x, y, width and height


  this.ctx.restore();
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Rock2 = exports.Rock2 = function Rock2(xpos, ypos, length, speed, ctx) {
  //add ctx;
  this.ctx = ctx;
  this.ypos = ypos;
  this.xpos = xpos;
  this.speed = speed;
  this.length = length;
  this.width = 100;
  this.rock = document.getElementById('rock2');
};

Rock2.prototype.update = function () {
  this.xpos -= this.speed;
};

Rock2.prototype.render = function () {
  this.ctx.save();
  this.ctx.drawImage(this.rock, this.xpos, this.ypos, this.width, this.length);
  // this.ctx.fillStyle = "#000000"; //black.
  // this.ctx.fillRect(this.xpos, this.ypos, this.width, this.length); //canvas fill rect at x, y, width and height
  //pos = x,
  // this.ctx.fillStyle = '#CD853F'; //light brown
  // this.ctx.fillRect(this.xpos + 5, this.ypos  + 5, this.width, this.length - 10); //canvas fill rect at x, y, width and height


  this.ctx.restore();
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Environment = exports.Environment = function Environment(ctx, canvas) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.bgPos = 0;
  this.fgPos = 0;
  this.bgSpeed = 2;
  this.bgWidth = 3000;
  this.bgImg = document.getElementById('bg');
  this.song = document.getElementById('underthesea');
};

Environment.prototype.update = function () {
  this.bgPos -= this.bgSpeed;
  if (this.bgPos < -this.bgWidth + 1400) this.bgPos = 0;
};

Environment.prototype.render = function (canvas, ctx) {

  for (var i = 0; i <= this.canvas.width / this.bgWidth; i++) {
    //canvas == innerWidth(1500) / 1280 ~ ~2
    this.ctx.drawImage(this.bgImg, this.bgPos + i * this.bgWidth, 0);
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map