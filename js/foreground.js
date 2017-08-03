window.onkeydown = function(e) {
  return !(e.keyCode === 32);
};
// eat the spacebar^

window.onload = function() {

const canvas2 = document.getElementById('canvas2');
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
const ctx2 = canvas2.getContext('2d');

ctx2.font = '48px serif';
ctx2.fillText('Hello world', 500, 500);
  ctx2.fillStyle = "#FFFFFF";
  ctx2.fillRect(0,0, canvas2.width, canvas2.height);


};



function fadeOut(text, canvas, context) {
    var alpha = 1.0,   // full opacity
        interval = setInterval(function () {
            canvas.width = canvas.width; // Clears the canvas
            context.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
            context.font = "italic 20pt Arial";
            context.fillText(text, 500, 500);
            alpha = alpha - 0.05; // decrease opacity (fade out)
            if (alpha < 0) {
                canvas.width = canvas.width;
                clearInterval(interval);
            }
        }, 50);
      }
