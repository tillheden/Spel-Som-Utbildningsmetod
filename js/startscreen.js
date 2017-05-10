var input, playername, fort, gradient, t
function loadStartScreen() {
  updateListener = createjs.Ticker.on("tick", updateStartScreen);

  gradient = new createjs.Shape();
                  gradient.graphics.beginLinearGradientFill(["#87E0FD", "#53CBF1", "#05ABE0"], [0, 0.5, 1], stage.canvas.width/2, 0, stage.canvas.width/2, stage.canvas.height);
                  gradient.graphics.drawRect(0, 0, stage.canvas.width, stage.canvas.height);
                  gradient.graphics.endFill();
  stage.addChild(gradient);


  t = new createjs.Text("Fyll i ditt namn:", "30px Arial", "#FFF");
  stage.addChild(t);
  t.x = stage.canvas.width/2;
  t.y = stage.canvas.height * 0.28;
  t.textAlign = "center";

  input = document.createElement("INPUT");
  input.setAttribute("type", "text");
  input.style.width = "125px";
  input.style.position = "absolute";
  input.style.top = "35%";
  input.style.left = "42.5%";
  document.body.appendChild(input);

  fort = new createjs.Bitmap("bitmaps/fortsätt.png");
  stage.addChild(fort);
  fort.on("click", start);
  fort.x = stage.canvas.width/2 - 110;
  fort.y = stage.canvas.height * 0.4;

  /*start();*/
}

function updateStartScreen() {
  stage.update();
}

function start() {
  playername = {};
  playername.name = input.value;
  if (playername.name != "") {
    createjs.Ticker.off("tick", updateListener);
    stage.removeAllChildren();
    document.body.removeChild(input);
    loadCharacterSelection();
  } else {
    t.color = "red";
  }
  /*loadScoreScreen();*/
}
