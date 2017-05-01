var drawRastListener;

function rast() {
  console.log("rast");
  drawRastListener = createjs.Ticker.on("tick", drawRast);
  var rastBg = new createjs.Bitmap("bitmaps/rastbg.png");
  // PicWidth * Scale = CanvasWidth => Scale = CanvasWidth / PicWidth
  rastBg.scaleX = stage.canvas.width / 428;
  rastBg.scaleY = stage.canvas.height / 283;
  stage.addChild(rastBg);
  var t = "Du samlade totalt ihop " + score + " poäng!";
  var rastText = new createjs.Text(t, "40px Arial", "#FFF");
  rastText.x = (stage.canvas.width/2) - (rastText.getMeasuredWidth()/2);
  rastText.y = 470;
  rastText.shadow = new createjs.Shadow("#000", 2, 2, 10);
  stage.addChild(rastText);
}

function drawRast() {
  stage.update();
}
