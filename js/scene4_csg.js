var dok
function loadCSG(msg) {
  updateListener = createjs.Ticker.on("tick", updateCSG);
  stage.addChild(station);
  stage.addChild(sprayburk);
  stage.addChild(klotter);
  klotter.x = klotter.originalX;
  klotter.y = klotter.originalY;

  stage.addChild(csg);
  csg.gotoAndPlay("csg_idle");
  csg.x = stage.canvas.width/2;

  dok = new createjs.Bitmap("bitmaps/dokumentera.png");
  stage.addChild(dok);
  dok.y = klotter.y;
  dok.x = klotter.x;
  dok.scaleX = dok.scaleY = 0.33;
  dok.on("click", dokumentera);

  if (msg == 0) tooltipGraphics = new createjs.Bitmap("bitmaps/komundan.png");
  else tooltipGraphics = new createjs.Bitmap("bitmaps/grip.png");
  tooltipGraphics.on("click", registreraISkadeDB);
  tooltipGraphics.x = 1015;
  tooltipGraphics.y = 15;
  tooltipGraphics.scaleX = tooltipGraphics.scaleY = 0.25;
  stage.addChild(tooltipGraphics);

  placeScore();
}

function updateCSG() {
  stage.update();
}

function endCSG() {
  createjs.Ticker.off("tick", updateListener);
  stage.removeAllChildren();
  loadTrafikent();
}

function dokumentera(event) {
  var kameraSound = new Audio("sounds/camera_shutter.mp3");
  kameraSound.play();
  addScore(event, 150);
  stage.removeChild(event.target);
}

function registreraISkadeDB() {
  addScore(event, 200);
  endCSG();
}
