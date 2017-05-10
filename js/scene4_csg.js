var dok
function loadCSG(event) {
  updateListener = createjs.Ticker.on("tick", updateCSG);
  stage.addChild(station);
  stage.addChild(klotter);
  stage.addChild(sprayburk);
  klotter.x = klotter.originalX;
  klotter.y = klotter.originalY;
  sprayburk.x = klotter.x
  sprayburk.on("click", taBevis);

  stage.addChild(csg);
  csg.gotoAndPlay("csg_idle");
  csg.x = stage.canvas.width/2;

  dok = new createjs.Bitmap("bitmaps/dokumentera.png");
  stage.addChild(dok);
  dok.y = klotter.y;
  dok.x = klotter.x;
  dok.scaleX = dok.scaleY = 0.33;
  dok.on("click", dokumentera);

  if (s == 0) tooltipGraphics = new createjs.Bitmap("bitmaps/komundan.png");
  else tooltipGraphics = new createjs.Bitmap("bitmaps/grip.png");
  event.stageX = csg.x;
  event.stageY = csg.y;
  addScore(event, event.score);
  tooltipGraphics.on("click", registreraISkadeDB);
  tooltipGraphics.x = 1050;
  tooltipGraphics.y = 15;
  tooltipGraphics.scaleX = tooltipGraphics.scaleY = 0.45;
  stage.addChild(tooltipGraphics);

  placeScore();
  /*endCSG();*/
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
  endCSG();
}

function taBevis(event) {
  addScore(event, 150);
  stage.removeChild(sprayburk);
}
