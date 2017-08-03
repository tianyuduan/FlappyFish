let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');



export const loadingScreen = function () {
  let gameStarted = false;

  document.body.addEventListener("keydown", function(event){

	if(event.keyCode === 13 && !gameStarted){
    gameLoop();
	}

});

function introScreen() {

  context.font = "50px Impact";
  context.fillStyle = "#0099CC";
  context.textAlign = "center";

  canvas.width = window.innerWidth;
  canvas.height = 600;

  context.font = "40px Arial";
  context.fillText("Flappy Fish", canvas.width/2, canvas.height/2);

  context.fillText("Press Enter To Start", canvas.width/2, canvas.height/2 + 50);

}


};
