var kamera, kameraTooltip
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

  kamera = new createjs.Bitmap("bitmaps/camera.png");
  stage.addChild(kamera);
  kamera.y = csg.y;
  kamera.x = csg.x;
  kamera.on("click", dokumentera);
  kameraTooltip = new createjs.Bitmap("bitmaps/kollavtal.png");
  kameraTooltip.x = kamera.x-25;
  kameraTooltip.y = kamera.y-25;
  kameraTooltip.scaleY = kameraTooltip.scaleX = 2/5;
  kameraTooltip.on("click", dokumentera);
  stage.addChild(kameraTooltip);

  var mobil = new createjs.Bitmap("bitmaps/phone.png");
  stage.addChild(mobil);
  mobil.y = csg.y + 90;
  mobil.x = csg.x;
  mobil.scaleX = mobil.scaleY = 0.33;
  mobil.on("click", registreraISkadeDB);
  mobilTooltip = new createjs.Bitmap("bitmaps/kollavtal.png");
  mobilTooltip.x = mobil.x-25;
  mobilTooltip.y = mobil.y-25;
  mobilTooltip.scaleY = mobilTooltip.scaleX = 2/5;
  mobilTooltip.on("click", registreraISkadeDB);
  stage.addChild(mobilTooltip);

  stage.addChild(textTooltip);
  textTooltip.text = msg;

  stage.addChild(scoreText);
  stage.setChildIndex(scoreText, stage.getNumChildren() - 1);
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
  stage.removeChild(kamera);
  stage.removeChild(kameraTooltip);
}

function registreraISkadeDB() {
  addScore(event, 200);
  endCSG();
}
