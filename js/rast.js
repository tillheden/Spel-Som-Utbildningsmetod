var updateRastListener;

function loadRast() {
  updateListener = createjs.Ticker.on("tick", updateRast);
  var t = "Du samlade totalt ihop " + score + " poäng!";
  var rastText = new createjs.Text(t, "40px Arial", "#FFF");
  rastText.x = (stage.canvas.width/2) - (rastText.getMeasuredWidth()/2);
  rastText.y = 270;
  rastText.shadow = new createjs.Shadow("#000", 2, 2, 10);
  stage.addChild(rastText);

  var kaffemug = new createjs.Bitmap("bitmaps/coffee.png");
  kaffemug.x = stage.canvas.width/2-50;
  kaffemug.y = 350;
  stage.addChild(kaffemug);
  kaffemug.on("click", nyttSpel);
  rastText.on("click", nyttSpel);
}

function updateRast() {
  stage.update();
}

function nyttSpel() {
  location.reload();
}
